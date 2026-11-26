package com.pkuih.enterprisehealth.slot;

import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.auth.UserPrincipal;
import com.pkuih.enterprisehealth.catalog.CatalogService;
import com.pkuih.enterprisehealth.common.ApiException;
import com.pkuih.enterprisehealth.domain.ExpertEntity;
import com.pkuih.enterprisehealth.domain.SlotEntity;
import com.pkuih.enterprisehealth.repository.AppointmentRepository;
import com.pkuih.enterprisehealth.repository.DemandRepository;
import com.pkuih.enterprisehealth.repository.ExpertRepository;
import com.pkuih.enterprisehealth.repository.SlotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SlotService {
    private final SlotRepository slots;
    private final ExpertRepository experts;
    private final AppointmentRepository appointments;
    private final DemandRepository demands;
    private final CatalogService catalogService;
    private final AuthService authService;

    public List<Map<String, Object>> list(String doctorId, LocalDate from, LocalDate to) {
        catalogService.requireExpert(doctorId);
        LocalDate start = from == null ? LocalDate.now() : from;
        LocalDate end = to == null ? start.plusDays(60) : to;
        if (end.isBefore(start)) {
            throw ApiException.badRequest("INVALID_DATE_RANGE", "结束日期不能早于开始日期。");
        }
        Map<LocalDate, Long> booked = appointments
            .findByDoctorIdAndDateBetweenAndStatusNot(doctorId, start, end, "cancelled")
            .stream()
            .filter(item -> !Boolean.TRUE.equals(item.getManualArrangement()))
            .collect(Collectors.groupingBy(item -> item.getDate(), Collectors.counting()));
        Map<LocalDate, Long> manual = appointments
            .findByDoctorIdAndDateBetweenAndStatusNot(doctorId, start, end, "cancelled")
            .stream()
            .filter(item -> Boolean.TRUE.equals(item.getManualArrangement()))
            .collect(Collectors.groupingBy(item -> item.getDate(), Collectors.counting()));
        Set<LocalDate> reserved = demands.findByStatusAndMatchedExpertId("matched", doctorId)
            .stream()
            .map(item -> item.getMatchedDate())
            .collect(Collectors.toSet());

        return slots.findByDoctorIdAndDateBetweenOrderByDateAsc(doctorId, start, end).stream()
            .filter(slot -> !slot.getDate().isBefore(start) && !slot.getDate().isAfter(end))
            .map(slot -> slotMap(
                slot,
                booked.getOrDefault(slot.getDate(), 0L),
                manual.getOrDefault(slot.getDate(), 0L),
                reserved.contains(slot.getDate()) ? 1L : 0L
            ))
            .toList();
    }

    @Transactional
    public Map<String, Object> batchSave(BatchSlotRequest request) {
        UserPrincipal principal = authService.currentPrincipal();
        if (!List.of("SUPERADMIN", "OPERATOR").contains(principal.role())) {
            throw ApiException.forbidden("仅院方账号可以配置号源。");
        }
        if (request.doctorIds() == null || request.doctorIds().isEmpty()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择专家。");
        }
        if (request.from() == null || request.to() == null || request.to().isBefore(request.from())) {
            throw ApiException.badRequest("INVALID_DATE_RANGE", "请选择正确的日期范围。");
        }
        if (request.capacity() == null || request.capacity() < 0) {
            throw ApiException.badRequest("INVALID_CAPACITY", "号源数量不能小于 0。");
        }
        Set<Integer> weekdays = request.weekdays() == null || request.weekdays().isEmpty()
            ? Set.of(1, 2, 3, 4, 5, 6, 7)
            : request.weekdays().stream().collect(Collectors.toSet());

        List<SlotEntity> rows = new ArrayList<>();
        for (String doctorId : request.doctorIds().stream().distinct().toList()) {
            ExpertEntity expert = catalogService.requireExpert(doctorId);
            requireManageable(principal, expert);
            LocalDate earliest = LocalDate.now().plusDays(expert.getLeadDays() == null ? 7 : expert.getLeadDays());
            LocalDate start = request.from().isBefore(earliest) ? earliest : request.from();
            List<SlotEntity> locked = slots.findRangeForUpdate(doctorId, request.from(), request.to());
            Map<java.time.LocalDate, SlotEntity> existingByDate = locked.stream()
                .collect(Collectors.toMap(SlotEntity::getDate, item -> item));
            long aggregateVersion = locked.stream()
                .map(SlotEntity::getVersion)
                .filter(Objects::nonNull)
                .mapToLong(Long::longValue)
                .sum();
            boolean versionProblem = !locked.isEmpty() && (
                request.versionByDoctor() == null ||
                    !request.versionByDoctor().containsKey(doctorId) ||
                    !Objects.equals(request.versionByDoctor().get(doctorId), aggregateVersion)
            );
            for (LocalDate date = start; !date.isAfter(request.to()); date = date.plusDays(1)) {
                if (!weekdays.contains(date.getDayOfWeek().getValue())) continue;
                LocalDate slotDate = date;
                long booked = appointments.countByDoctorIdAndDateAndStatusNot(doctorId, slotDate, "cancelled");
                if (request.capacity() < booked) {
                    throw ApiException.conflict(
                        "SLOT_CAPACITY_BELOW_BOOKED",
                        slotDate + " 已预约 " + booked + " 人，号源不能小于已预约数量。"
                    );
                }
                SlotEntity slot = existingByDate.get(slotDate);
                if (slot == null) {
                    slot = SlotEntity.builder()
                        .id(slotId(doctorId, slotDate))
                        .doctorId(doctorId)
                        .date(slotDate)
                        .build();
                    existingByDate.put(slotDate, slot);
                }
                slot.setCapacity(request.capacity());
                rows.add(slot);
            }
            if (versionProblem) {
                String code = locked.isEmpty() ? "SLOT_VERSION_REQUIRED" : "SLOT_VERSION_CONFLICT";
                String message = locked.isEmpty()
                    ? "号源已发生变化，请刷新后重试。"
                    : "号源已被其他运营人员更新，请刷新后重试。";
                throw ApiException.conflict(code, message);
            }
        }
        slots.saveAll(rows);
        return Map.of("saved", rows.size(), "from", request.from(), "to", request.to(), "capacity", request.capacity());
    }

    public void requireManageable(UserPrincipal principal, ExpertEntity expert) {
        if ("SUPERADMIN".equals(principal.role())) return;
        if ("OPERATOR".equals(principal.role()) && principal.hospitalId().equals(expert.getHospitalId())) return;
        throw ApiException.forbidden("无权维护该专家的号源。");
    }

    private Map<String, Object> slotMap(SlotEntity slot, long booked, long manual, long reserved) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("doctorId", slot.getDoctorId());
        map.put("date", slot.getDate());
        map.put("capacity", slot.getCapacity());
        map.put("booked", booked);
        map.put("manualBooked", manual);
        map.put("reserved", reserved);
        map.put("remaining", Math.max(0, slot.getCapacity() - (int) booked));
        map.put("version", slot.getVersion());
        return map;
    }

    private String slotId(String doctorId, LocalDate date) {
        return doctorId + "|" + date;
    }

    public record BatchSlotRequest(
        List<String> doctorIds,
        LocalDate from,
        LocalDate to,
        Set<Integer> weekdays,
        Integer capacity,
        Map<String, Long> versionByDoctor
    ) {}
}
