package com.pkuih.enterprisehealth.expert;

import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.auth.UserPrincipal;
import com.pkuih.enterprisehealth.catalog.CatalogService;
import com.pkuih.enterprisehealth.common.ApiException;
import com.pkuih.enterprisehealth.common.ApiResponse;
import com.pkuih.enterprisehealth.domain.ExpertEntity;
import com.pkuih.enterprisehealth.domain.HospitalEntity;
import com.pkuih.enterprisehealth.repository.ExpertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/experts")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
public class ExpertAdminController {
    private final ExpertRepository experts;
    private final CatalogService catalogService;
    private final AuthService authService;

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        UserPrincipal principal = authService.currentPrincipal();
        List<ExpertEntity> rows = "SUPERADMIN".equals(principal.role())
            ? experts.findAll()
            : experts.findByHospitalIdAndActiveTrueOrderByTierAscNameAsc(principal.hospitalId());
        return ApiResponse.ok(rows.stream().map(catalogService::expertMap).toList());
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create(@RequestBody ExpertRequest request) {
        UserPrincipal principal = authService.currentPrincipal();
        ExpertEntity expert = new ExpertEntity();
        expert.setId("expert-" + UUID.randomUUID().toString().replace("-", "").substring(0, 10));
        apply(expert, request, principal, true);
        experts.save(expert);
        return ApiResponse.ok(catalogService.expertMap(expert));
    }

    @PatchMapping("/{id}")
    public ApiResponse<Map<String, Object>> update(
        @PathVariable String id,
        @RequestBody ExpertRequest request
    ) {
        UserPrincipal principal = authService.currentPrincipal();
        ExpertEntity expert = catalogService.requireExpert(id);
        requireManageable(principal, expert);
        apply(expert, request, principal, false);
        experts.save(expert);
        return ApiResponse.ok(catalogService.expertMap(expert));
    }

    private void apply(ExpertEntity expert, ExpertRequest request, UserPrincipal principal, boolean creating) {
        String hospitalId = request.hospitalId();
        if ("OPERATOR".equals(principal.role())) hospitalId = principal.hospitalId();
        if (hospitalId == null || hospitalId.isBlank()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择履约医院。");
        }
        HospitalEntity hospital = catalogService.requireHospital(hospitalId);
        if (request.name() == null || request.name().isBlank()) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写专家姓名。");
        }
        if (request.tier() == null || !Set.of("elite", "director", "specialist").contains(request.tier())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请选择专家层级。");
        }
        int minimumLead = switch (request.tier()) {
            case "elite" -> 30;
            case "director" -> 14;
            default -> 7;
        };
        int leadDays = request.leadDays() == null ? minimumLead : Math.max(minimumLead, request.leadDays());
        List<String> services = request.services() == null ? List.of("讲座") : request.services();
        if (services.isEmpty() || services.stream().anyMatch(item ->
            !Set.of("讲座", "健康咨询", "1V1报告解读").contains(item))) {
            throw ApiException.badRequest("VALIDATION_ERROR", "专家服务类型不正确。");
        }
        expert.setName(request.name().trim());
        expert.setNo(creating ? String.valueOf(experts.count() + 1) : expert.getNo());
        expert.setTier(request.tier());
        expert.setHospitalId(hospital.getId());
        expert.setHospital(hospital.getName());
        expert.setDept(value(request.dept()));
        expert.setDeptTitle(value(request.deptTitle()));
        expert.setServicesJson(catalogService.toJson(services));
        expert.setCoverage(value(request.coverage()));
        expert.setCoverageCitiesJson(catalogService.toJson(
            request.coverageCities() == null ? List.of() : request.coverageCities()
        ));
        expert.setCoverageRegionsJson(catalogService.toJson(
            request.coverageCities() == null ? List.of() : request.coverageCities()
        ));
        expert.setSpecialty(value(request.specialty()));
        expert.setIntro(value(request.intro()));
        expert.setLeadDays(leadDays);
        expert.setLeadLabel("提前 " + leadDays + " 天申请");
        expert.setGender(request.gender() == null ? "neutral" : request.gender());
        expert.setPhoto(value(request.photo()));
        expert.setPhotoCard(value(request.photoCard()));
        expert.setPhotoDetail(value(request.photoDetail()));
        expert.setProfileUrl(value(request.profileUrl()));
        expert.setActive(request.active() == null || request.active());
        expert.setRegion(hospital.getRegion());
    }

    private void requireManageable(UserPrincipal principal, ExpertEntity expert) {
        if ("SUPERADMIN".equals(principal.role())) return;
        if ("OPERATOR".equals(principal.role()) && principal.hospitalId().equals(expert.getHospitalId())) return;
        throw ApiException.forbidden("无权维护该专家。");
    }

    private String value(String value) {
        return value == null ? "" : value.trim();
    }

    public record ExpertRequest(
        String name,
        String tier,
        String hospitalId,
        String dept,
        String deptTitle,
        List<String> services,
        String coverage,
        List<String> coverageCities,
        String specialty,
        String intro,
        Integer leadDays,
        String gender,
        String photo,
        String photoCard,
        String photoDetail,
        String profileUrl,
        Boolean active
    ) {}
}
