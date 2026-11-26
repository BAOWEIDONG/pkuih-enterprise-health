package com.pkuih.enterprisehealth.appointment;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.auth.UserPrincipal;
import com.pkuih.enterprisehealth.catalog.CatalogService;
import com.pkuih.enterprisehealth.catalog.CoverageService;
import com.pkuih.enterprisehealth.common.ApiException;
import com.pkuih.enterprisehealth.domain.AppointmentEntity;
import com.pkuih.enterprisehealth.domain.DemandEntity;
import com.pkuih.enterprisehealth.domain.ExpertEntity;
import com.pkuih.enterprisehealth.domain.InstitutionAccountEntity;
import com.pkuih.enterprisehealth.domain.SlotEntity;
import com.pkuih.enterprisehealth.repository.AppointmentRepository;
import com.pkuih.enterprisehealth.repository.DemandRepository;
import com.pkuih.enterprisehealth.repository.InstitutionAccountRepository;
import com.pkuih.enterprisehealth.repository.SlotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private static final Set<String> SERVICES = Set.of("讲座", "健康咨询", "1V1报告解读");
    private static final Set<String> ACTIVE_STATUSES = Set.of(
        "pending", "planning", "review", "revision", "confirmed", "completed"
    );

    private final AppointmentRepository appointments;
    private final DemandRepository demands;
    private final SlotRepository slots;
    private final InstitutionAccountRepository institutionAccounts;
    private final CatalogService catalogService;
    private final CoverageService coverageService;
    private final AuthService authService;
    private final ObjectMapper objectMapper;

    @Transactional
    public Map<String, Object> create(UserPrincipal principal, String idempotencyKey, CreateAppointmentRequest request) {
        requireRole(principal, "INSTITUTION", "仅机构账号可以提交预约。");
        String normalizedKey = blankToNull(idempotencyKey);
        if (normalizedKey != null && normalizedKey.length() > 128) {
            throw ApiException.badRequest("VALIDATION_ERROR", "Idempotency-Key 长度不能超过 128 个字符。");
        }
        String requestFingerprint = normalizedKey == null ? null : fingerprint(request);
        if (idempotencyKey != null && !idempotencyKey.isBlank()) {
            var existing = appointments.findByIdempotencyKey(idempotencyKey);
            if (existing.isPresent()) {
                requireOwner(principal, existing.get());
                String storedFingerprint = existing.get().getIdempotencyFingerprint();
                if (storedFingerprint != null && !storedFingerprint.equals(requestFingerprint)) {
                    throw ApiException.conflict(
                        "DUPLICATE_REQUEST",
                        "该 Idempotency-Key 已用于不同的预约内容，请重新发起。"
                    );
                }
                return view(existing.get());
            }
        }
        validateRequest(request);
        ExpertEntity expert = catalogService.requireExpert(request.doctorId());
        if (!SERVICES.contains(request.serviceType()) ||
            !catalogService.jsonList(expert.getServicesJson()).contains(request.serviceType())) {
            throw ApiException.badRequest("SERVICE_NOT_SUPPORTED", "该专家不支持所选服务类型。");
        }
        if (!coverageService.covers(
            catalogService.jsonList(expert.getCoverageCitiesJson()),
            request.province(),
            request.city()
        )) {
            throw ApiException.badRequest("COVERAGE_NOT_SUPPORTED", "该专家暂不覆盖所选城市。");
        }
        LocalDate earliest = LocalDate.now().plusDays(expert.getLeadDays() == null ? 7 : expert.getLeadDays());
        if (request.date().isBefore(earliest)) {
            throw ApiException.badRequest(
                "LEAD_TIME_NOT_MET",
                "该专家需至少提前 " + (expert.getLeadDays() == null ? 7 : expert.getLeadDays()) + " 天预约。"
            );
        }

        InstitutionAccountEntity account = institutionAccounts.findById(principal.id())
            .orElseThrow(() -> ApiException.notFound("ACCOUNT_NOT_FOUND", "机构账号不存在。"));
        requireCompleteProfile(account);

        DemandEntity demand = null;
        boolean manual = false;
        if (request.demandId() != null && !request.demandId().isBlank()) {
            demand = demands.findById(request.demandId())
                .orElseThrow(() -> ApiException.notFound("DEMAND_NOT_FOUND", "提需单不存在。"));
            validateDemandConversion(principal, demand, request, expert);
            if (appointments.findFirstByDemandId(demand.getId()).isPresent()) {
                throw ApiException.conflict("DEMAND_ALREADY_CONVERTED", "该提需已生成预约，不能重复提交。");
            }
            if (!appointments.findByDoctorIdAndDateAndStatusNot(expert.getId(), request.date(), "cancelled").isEmpty()) {
                throw ApiException.conflict("EXPERT_DATE_CONFLICT", "该专家当日已有活动，请重新匹配日期。");
            }
            manual = true;
        } else {
            if (!demands.findByStatusAndMatchedExpertIdAndMatchedDate(
                "matched",
                expert.getId(),
                request.date()
            ).isEmpty()) {
                throw ApiException.conflict("EXPERT_DATE_RESERVED", "该专家当日已被其他提需预留。");
            }
            SlotEntity slot = slots.findForUpdate(expert.getId(), request.date())
                .orElseThrow(() -> ApiException.conflict("SLOT_NOT_AVAILABLE", "该专家当日暂无号源。"));
            long booked = appointments.countByDoctorIdAndDateAndStatusNot(expert.getId(), request.date(), "cancelled");
            if (booked >= slot.getCapacity()) {
                throw ApiException.conflict("SLOT_NOT_AVAILABLE", "该专家当日号源已满。");
            }
            if (!appointments.findByDoctorIdAndDateAndStatusNot(expert.getId(), request.date(), "cancelled")
                .stream()
                .filter(item -> Boolean.TRUE.equals(item.getManualArrangement()))
                .toList()
                .isEmpty()) {
                throw ApiException.conflict("EXPERT_DATE_CONFLICT", "该专家当日已被人工协调占用。");
            }
        }

        Instant now = Instant.now();
        AppointmentEntity appointment = AppointmentEntity.builder()
            .id("BD-" + LocalDate.now().toString().replace("-", "") + "-" + randomSuffix())
            .idempotencyKey(normalizedKey)
            .idempotencyFingerprint(requestFingerprint)
            .ownerPhone(principal.id())
            .hospitalId(expert.getHospitalId())
            .serviceType(request.serviceType())
            .doctorId(expert.getId())
            .doctorName(expert.getName())
            .tier(expert.getTier())
            .date(request.date())
            .province(request.province())
            .city(request.city())
            .address(request.address().trim())
            .venue(blankToNull(request.venue()))
            .topic(request.topic().trim())
            .audience(request.audience().trim())
            .headcount(request.headcount())
            .note(blankToNull(request.note()))
            .status("pending")
            .demandId(demand == null ? null : demand.getId())
            .manualArrangement(manual)
            .createdAt(now)
            .updatedAt(now)
            .build();
        appointments.save(appointment);

        if (demand != null) {
            demand.setStatus("converted");
            demand.setConvertedAppointmentId(appointment.getId());
            demand.setConvertedAt(now);
            demand.setUpdatedAt(now);
            demands.save(demand);
        }
        return view(appointment);
    }

    public List<Map<String, Object>> list(UserPrincipal principal) {
        List<AppointmentEntity> rows;
        if ("INSTITUTION".equals(principal.role())) {
            rows = appointments.findByOwnerPhoneOrderByCreatedAtDesc(principal.id());
        } else if ("OPERATOR".equals(principal.role())) {
            rows = appointments.findByHospitalIdOrderByCreatedAtDesc(principal.hospitalId());
        } else if ("SUPERADMIN".equals(principal.role())) {
            rows = appointments.findAllByOrderByCreatedAtDesc();
        } else {
            throw ApiException.forbidden("无权查看预约。");
        }
        return rows.stream().map(this::view).toList();
    }

    public Map<String, Object> detail(UserPrincipal principal, String id) {
        AppointmentEntity appointment = require(id);
        requireAccess(principal, appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> accept(UserPrincipal principal, String id) {
        AppointmentEntity appointment = require(id);
        requireAdminAccess(principal, appointment.getHospitalId());
        if (!"pending".equals(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "当前预约状态不能接单。");
        }
        appointment.setStatus("planning");
        appointment.setAcceptedAt(Instant.now());
        appointment.setUpdatedAt(Instant.now());
        appointment.setAssignedStaffJson(catalogService.toJson(Map.of(
            "id", principal.id(),
            "name", principal.displayName(),
            "phone", principal.phone()
        )));
        appointments.save(appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> savePlan(UserPrincipal principal, String id, Map<String, Object> plan) {
        AppointmentEntity appointment = require(id);
        requireAdminAccess(principal, appointment.getHospitalId());
        if (!Set.of("planning", "revision").contains(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "当前状态不能提交方案。");
        }
        if (plan == null || String.valueOf(plan.getOrDefault("topic", "")).isBlank()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写活动课题。");
        }
        appointment.setPlanJson(catalogService.toJson(plan));
        appointment.setStatus("review");
        appointment.setPlanSentAt(Instant.now());
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> confirm(UserPrincipal principal, String id) {
        AppointmentEntity appointment = require(id);
        requireOwner(principal, appointment);
        if (!"review".equals(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "当前预约不在待确认状态。");
        }
        appointment.setStatus("confirmed");
        appointment.setConfirmedAt(Instant.now());
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> requestRevision(UserPrincipal principal, String id, String feedback) {
        AppointmentEntity appointment = require(id);
        requireOwner(principal, appointment);
        if (!"review".equals(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "仅待确认方案可申请修改。");
        }
        if (feedback == null || feedback.isBlank()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写修改意见。");
        }
        appointment.setStatus("revision");
        appointment.setFeedback(feedback.trim());
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> cancel(UserPrincipal principal, String id, String reason) {
        AppointmentEntity appointment = require(id);
        requireOwner(principal, appointment);
        if (!ACTIVE_STATUSES.contains(appointment.getStatus()) ||
            Set.of("completed", "cancelled").contains(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "当前预约不能取消。");
        }
        int cancelLeadDays = Set.of("elite").contains(appointment.getTier()) ? 30 : 7;
        long remainingDays = ChronoUnit.DAYS.between(LocalDate.now(), appointment.getDate());
        if (remainingDays < cancelLeadDays) {
            throw ApiException.conflict(
                "CANCEL_WINDOW_CLOSED",
                "该预约需至少提前 " + cancelLeadDays + " 天取消，当前剩余 " + remainingDays + " 天。"
            );
        }
        appointment.setStatus("cancelled");
        appointment.setFeedback(blankToNull(reason));
        appointment.setCancelledAt(Instant.now());
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        if (appointment.getDemandId() != null) {
            demands.findById(appointment.getDemandId()).ifPresent(demand -> {
                demand.setStatus("closed");
                demand.setUpdatedAt(Instant.now());
                demands.save(demand);
            });
        }
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> updateLocation(UserPrincipal principal, String id, LocationRequest request) {
        AppointmentEntity appointment = require(id);
        requireOwner(principal, appointment);
        if (Set.of("confirmed", "completed", "cancelled").contains(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "当前状态不能修改活动地点。");
        }
        if (request.address() == null || request.address().isBlank()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写活动详细地址。");
        }
        appointment.setProvince(request.province());
        appointment.setCity(request.city());
        appointment.setAddress(request.address().trim());
        appointment.setVenue(blankToNull(request.venue()));
        appointment.setLocationUpdatedAt(Instant.now());
        if ("review".equals(appointment.getStatus())) appointment.setStatus("revision");
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> saveInternalNote(UserPrincipal principal, String id, String note) {
        AppointmentEntity appointment = require(id);
        requireAdminAccess(principal, appointment.getHospitalId());
        appointment.setInternalNote(note);
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        return view(appointment);
    }

    @Transactional
    public Map<String, Object> complete(UserPrincipal principal, String id) {
        AppointmentEntity appointment = require(id);
        requireAdminAccess(principal, appointment.getHospitalId());
        if (!"confirmed".equals(appointment.getStatus())) {
            throw ApiException.conflict("APPOINTMENT_STATE_CONFLICT", "仅已确认预约可标记完成。");
        }
        appointment.setStatus("completed");
        appointment.setCompletedAt(Instant.now());
        appointment.setUpdatedAt(Instant.now());
        appointments.save(appointment);
        return view(appointment);
    }

    public Map<String, Object> view(AppointmentEntity appointment) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", appointment.getId());
        map.put("ownerPhone", appointment.getOwnerPhone());
        map.put("hospitalId", appointment.getHospitalId());
        map.put("serviceType", appointment.getServiceType());
        map.put("doctorId", appointment.getDoctorId());
        map.put("doctorName", appointment.getDoctorName());
        map.put("tier", appointment.getTier());
        map.put("date", appointment.getDate());
        map.put("province", appointment.getProvince());
        map.put("city", appointment.getCity());
        map.put("address", appointment.getAddress());
        map.put("venue", appointment.getVenue());
        map.put("topic", appointment.getTopic());
        map.put("audience", appointment.getAudience());
        map.put("headcount", appointment.getHeadcount());
        map.put("note", appointment.getNote());
        map.put("status", appointment.getStatus());
        map.put("plan", jsonMap(appointment.getPlanJson()));
        map.put("assignedStaff", jsonMap(appointment.getAssignedStaffJson()));
        map.put("internalNote", appointment.getInternalNote());
        map.put("feedback", appointment.getFeedback());
        map.put("demandId", appointment.getDemandId());
        map.put("manualArrangement", Boolean.TRUE.equals(appointment.getManualArrangement()));
        map.put("createdAt", appointment.getCreatedAt());
        map.put("updatedAt", appointment.getUpdatedAt());
        map.put("acceptedAt", appointment.getAcceptedAt());
        map.put("planSentAt", appointment.getPlanSentAt());
        map.put("confirmedAt", appointment.getConfirmedAt());
        map.put("cancelledAt", appointment.getCancelledAt());
        map.put("completedAt", appointment.getCompletedAt());
        map.put("version", appointment.getVersion());
        return map;
    }

    private void validateRequest(CreateAppointmentRequest request) {
        if (request.serviceType() == null || !SERVICES.contains(request.serviceType())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择正确的服务类型。");
        }
        if (request.date() == null || request.doctorId() == null || request.doctorId().isBlank()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择专家和活动日期。");
        }
        if (blank(request.province()) || blank(request.city()) || blank(request.address())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写完整的活动地点。");
        }
        if (blank(request.topic()) || blank(request.audience()) ||
            request.headcount() == null || request.headcount() <= 0) {
            throw ApiException.badRequest("VALIDATION_ERROR", "活动主题、参与人群和预计人数均为必填项。");
        }
    }

    private void validateDemandConversion(
        UserPrincipal principal,
        DemandEntity demand,
        CreateAppointmentRequest request,
        ExpertEntity expert
    ) {
        if (!principal.id().equals(demand.getOwnerPhone())) {
            throw ApiException.forbidden("无权使用该提需单。");
        }
        if (!"matched".equals(demand.getStatus())) {
            throw ApiException.conflict("DEMAND_STATE_CONFLICT", "该提需不在已匹配状态。");
        }
        if (!expert.getId().equals(demand.getMatchedExpertId()) ||
            !request.date().equals(demand.getMatchedDate()) ||
            !request.serviceType().equals(demand.getServiceType()) ||
            !expert.getHospitalId().equals(demand.getMatchedHospitalId())) {
            throw ApiException.conflict("DEMAND_MATCH_STALE", "院方已更新提需匹配信息，请返回详情重新确认。");
        }
    }

    private void requireCompleteProfile(InstitutionAccountEntity account) {
        if (blank(account.getName()) || blank(account.getOrgName()) ||
            blank(account.getContactPhone()) || blank(account.getEmail())) {
            throw ApiException.badRequest("PROFILE_INCOMPLETE", "请先完善姓名、单位、联系方式和通知邮箱。");
        }
    }

    private AppointmentEntity require(String id) {
        return appointments.findById(id)
            .orElseThrow(() -> ApiException.notFound("APPOINTMENT_NOT_FOUND", "预约不存在。"));
    }

    private void requireRole(UserPrincipal principal, String role, String message) {
        if (!role.equals(principal.role())) throw ApiException.forbidden(message);
    }

    private void requireOwner(UserPrincipal principal, AppointmentEntity appointment) {
        if (!"INSTITUTION".equals(principal.role()) || !principal.id().equals(appointment.getOwnerPhone())) {
            throw ApiException.forbidden("无权操作该预约。");
        }
    }

    private void requireAccess(UserPrincipal principal, AppointmentEntity appointment) {
        if ("INSTITUTION".equals(principal.role())) {
            requireOwner(principal, appointment);
            return;
        }
        requireAdminAccess(principal, appointment.getHospitalId());
    }

    private void requireAdminAccess(UserPrincipal principal, String hospitalId) {
        if ("SUPERADMIN".equals(principal.role())) return;
        if ("OPERATOR".equals(principal.role()) && principal.hospitalId().equals(hospitalId)) return;
        throw ApiException.forbidden("无权访问该医院的预约。");
    }

    private String blankToNull(String value) {
        return blank(value) ? null : value.trim();
    }

    private boolean blank(String value) {
        return value == null || value.isBlank();
    }

    private String fingerprint(CreateAppointmentRequest request) {
        String canonical = String.join(
            "\u001f",
            normalize(request.serviceType()),
            normalize(request.doctorId()),
            normalize(request.date()),
            normalize(request.province()),
            normalize(request.city()),
            normalize(request.address()),
            normalize(request.venue()),
            normalize(request.topic()),
            normalize(request.audience()),
            normalize(request.headcount()),
            normalize(request.note()),
            normalize(request.demandId())
        );
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(canonical.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 不可用。", exception);
        }
    }

    private String normalize(Object value) {
        return value == null ? "" : String.valueOf(value).trim();
    }

    private String randomSuffix() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 4).toUpperCase();
    }

    private Map<String, Object> jsonMap(String json) {
        if (json == null || json.isBlank()) return Map.of();
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception exception) {
            return Map.of();
        }
    }

    public record CreateAppointmentRequest(
        String serviceType,
        String doctorId,
        LocalDate date,
        String province,
        String city,
        String address,
        String venue,
        String topic,
        String audience,
        Integer headcount,
        String note,
        String demandId
    ) {}

    public record LocationRequest(String province, String city, String address, String venue) {}
}
