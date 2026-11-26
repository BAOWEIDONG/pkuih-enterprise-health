package com.pkuih.enterprisehealth.demand;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.auth.UserPrincipal;
import com.pkuih.enterprisehealth.catalog.CatalogService;
import com.pkuih.enterprisehealth.common.ApiException;
import com.pkuih.enterprisehealth.domain.DemandEntity;
import com.pkuih.enterprisehealth.domain.ExpertEntity;
import com.pkuih.enterprisehealth.repository.AppointmentRepository;
import com.pkuih.enterprisehealth.repository.DemandRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DemandService {
    private final DemandRepository demands;
    private final AppointmentRepository appointments;
    private final CatalogService catalogService;
    private final AuthService authService;
    private final ObjectMapper objectMapper;

    @Transactional
    public Map<String, Object> create(UserPrincipal principal, CreateDemandRequest request) {
        if (!"INSTITUTION".equals(principal.role())) {
            throw ApiException.forbidden("仅机构账号可以发起提需。");
        }
        if (request.targetType() == null || !Set.of("group", "hospital").contains(request.targetType())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择提需目标。");
        }
        if ("hospital".equals(request.targetType())) {
            catalogService.requireHospital(request.hospitalId());
        }
        if (blank(request.serviceType()) || blank(request.topic()) ||
            blank(request.audience()) || request.headcount() == null || request.headcount() <= 0) {
            throw ApiException.badRequest("VALIDATION_ERROR", "服务类型、主题、参与人群和人数均为必填项。");
        }
        if (blank(request.province()) || blank(request.city())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择活动省市。");
        }
        Instant now = Instant.now();
        DemandEntity demand = DemandEntity.builder()
            .id("XQ-" + LocalDate.now().toString().replace("-", "") + "-" + randomSuffix())
            .ownerPhone(principal.id())
            .targetType(request.targetType())
            .hospitalId("hospital".equals(request.targetType()) ? request.hospitalId() : null)
            .serviceType(request.serviceType())
            .topic(request.topic().trim())
            .audience(request.audience().trim())
            .headcount(request.headcount())
            .preferredDate(request.preferredDate())
            .province(request.province())
            .city(request.city())
            .status("pending")
            .note(blankToNull(request.note()))
            .createdAt(now)
            .updatedAt(now)
            .build();
        demands.save(demand);
        return view(demand);
    }

    public List<Map<String, Object>> list(UserPrincipal principal) {
        List<DemandEntity> rows;
        if ("INSTITUTION".equals(principal.role())) {
            rows = demands.findByOwnerPhoneOrderByCreatedAtDesc(principal.id());
        } else if ("SUPERADMIN".equals(principal.role())) {
            rows = demands.findAllByOrderByCreatedAtDesc();
        } else if ("OPERATOR".equals(principal.role())) {
            rows = demands.findByHospitalIdOrderByCreatedAtDesc(principal.hospitalId());
        } else {
            throw ApiException.forbidden("无权查看提需。");
        }
        return rows.stream().map(this::view).toList();
    }

    public Map<String, Object> detail(UserPrincipal principal, String id) {
        DemandEntity demand = require(id);
        requireAccess(principal, demand);
        return view(demand);
    }

    @Transactional
    public Map<String, Object> contact(UserPrincipal principal, String id, String note) {
        DemandEntity demand = require(id);
        requireAdminAccess(principal, demand);
        if (!"pending".equals(demand.getStatus())) {
            throw ApiException.conflict("DEMAND_STATE_CONFLICT", "当前提需不能标记已联系。");
        }
        demand.setStatus("contacted");
        demand.setMatchNote(note);
        demand.setAssignedStaffJson(catalogService.toJson(Map.of(
            "id", principal.id(),
            "name", principal.displayName(),
            "phone", principal.phone()
        )));
        demand.setUpdatedAt(Instant.now());
        demands.save(demand);
        return view(demand);
    }

    @Transactional
    public Map<String, Object> match(UserPrincipal principal, String id, MatchRequest request) {
        DemandEntity demand = require(id);
        requireAdminAccess(principal, demand);
        if (!"contacted".equals(demand.getStatus())) {
            throw ApiException.conflict("DEMAND_STATE_CONFLICT", "请先联系客户后再匹配专家。");
        }
        ExpertEntity expert = catalogService.requireExpert(request.doctorId());
        if (!catalogService.jsonList(expert.getServicesJson()).contains(demand.getServiceType())) {
            throw ApiException.badRequest("SERVICE_NOT_SUPPORTED", "该专家不支持提需所需的服务类型。");
        }
        if ("hospital".equals(demand.getTargetType()) && !demand.getHospitalId().equals(expert.getHospitalId())) {
            throw ApiException.badRequest("HOSPITAL_MISMATCH", "匹配专家不属于提需指定医院。");
        }
        if (request.date() == null) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择匹配日期。");
        }
        LocalDate earliest = LocalDate.now().plusDays(expert.getLeadDays() == null ? 7 : expert.getLeadDays());
        if (request.date().isBefore(earliest)) {
            throw ApiException.badRequest("LEAD_TIME_NOT_MET", "匹配日期不满足专家预约提前期。");
        }
        if (!appointments.findByDoctorIdAndDateAndStatusNot(expert.getId(), request.date(), "cancelled").isEmpty()) {
            throw ApiException.conflict("EXPERT_DATE_CONFLICT", "该专家当日已有活动。");
        }
        boolean reserved = demands.findByStatusAndMatchedExpertIdAndMatchedDate(
            "matched",
            expert.getId(),
            request.date()
        ).stream().anyMatch(item -> !item.getId().equals(demand.getId()));
        if (reserved) {
            throw ApiException.conflict("DEMAND_DATE_RESERVED", "该专家当日已被其他提需预留。");
        }
        demand.setStatus("matched");
        demand.setMatchedExpertId(expert.getId());
        demand.setMatchedExpertName(expert.getName());
        demand.setMatchedHospitalId(expert.getHospitalId());
        demand.setMatchedDate(request.date());
        demand.setMatchedAt(Instant.now());
        demand.setMatchNote(request.note());
        demand.setUpdatedAt(Instant.now());
        demands.save(demand);
        return view(demand);
    }

    @Transactional
    public Map<String, Object> close(UserPrincipal principal, String id, String reason) {
        DemandEntity demand = require(id);
        requireAdminAccess(principal, demand);
        if (Set.of("converted", "closed", "cancelled").contains(demand.getStatus())) {
            throw ApiException.conflict("DEMAND_STATE_CONFLICT", "当前提需不能关闭。");
        }
        demand.setStatus("closed");
        demand.setMatchNote(blankToNull(reason));
        demand.setUpdatedAt(Instant.now());
        demands.save(demand);
        return view(demand);
    }

    public Map<String, Object> view(DemandEntity demand) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", demand.getId());
        map.put("ownerPhone", demand.getOwnerPhone());
        map.put("targetType", demand.getTargetType());
        map.put("hospitalId", demand.getHospitalId());
        map.put("serviceType", demand.getServiceType());
        map.put("topic", demand.getTopic());
        map.put("audience", demand.getAudience());
        map.put("headcount", demand.getHeadcount());
        map.put("preferredDate", demand.getPreferredDate());
        map.put("province", demand.getProvince());
        map.put("city", demand.getCity());
        map.put("status", demand.getStatus());
        map.put("note", demand.getNote());
        map.put("matchedExpertId", demand.getMatchedExpertId());
        map.put("matchedExpertName", demand.getMatchedExpertName());
        map.put("matchedHospitalId", demand.getMatchedHospitalId());
        map.put("matchedDate", demand.getMatchedDate());
        map.put("matchedAt", demand.getMatchedAt());
        map.put("matchNote", demand.getMatchNote());
        map.put("convertedAppointmentId", demand.getConvertedAppointmentId());
        map.put("convertedAt", demand.getConvertedAt());
        map.put("assignedStaff", jsonMap(demand.getAssignedStaffJson()));
        map.put("createdAt", demand.getCreatedAt());
        map.put("updatedAt", demand.getUpdatedAt());
        return map;
    }

    private DemandEntity require(String id) {
        return demands.findById(id)
            .orElseThrow(() -> ApiException.notFound("DEMAND_NOT_FOUND", "提需单不存在。"));
    }

    private void requireAccess(UserPrincipal principal, DemandEntity demand) {
        if ("INSTITUTION".equals(principal.role())) {
            if (!principal.id().equals(demand.getOwnerPhone())) throw ApiException.forbidden("无权查看该提需。");
            return;
        }
        requireAdminAccess(principal, demand);
    }

    private void requireAdminAccess(UserPrincipal principal, DemandEntity demand) {
        if ("group".equals(demand.getTargetType())) {
            if (!"SUPERADMIN".equals(principal.role())) {
                throw ApiException.forbidden("集团企康办需求仅超级管理员可以处理。");
            }
            return;
        }
        if ("SUPERADMIN".equals(principal.role())) return;
        if ("OPERATOR".equals(principal.role()) && principal.hospitalId().equals(demand.getHospitalId())) return;
        throw ApiException.forbidden("无权处理该医院的提需。");
    }

    private String blankToNull(String value) {
        return blank(value) ? null : value.trim();
    }

    private boolean blank(String value) {
        return value == null || value.isBlank();
    }

    private String randomSuffix() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 4).toUpperCase();
    }

    private Map<String, Object> jsonMap(String json) {
        if (json == null || json.isBlank()) return Map.of();
        try {
            return objectMapper.readValue(json, new com.fasterxml.jackson.core.type.TypeReference<>() {});
        } catch (Exception exception) {
            return Map.of();
        }
    }

    public record CreateDemandRequest(
        String targetType,
        String hospitalId,
        String serviceType,
        String topic,
        String audience,
        Integer headcount,
        LocalDate preferredDate,
        String province,
        String city,
        String note
    ) {}

    public record MatchRequest(String doctorId, LocalDate date, String note) {}
}
