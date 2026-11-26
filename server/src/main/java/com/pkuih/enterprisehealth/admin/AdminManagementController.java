package com.pkuih.enterprisehealth.admin;

import com.pkuih.enterprisehealth.common.ApiResponse;
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

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
public class AdminManagementController {
    private final AdminManagementService service;

    @GetMapping("/institution-accounts")
    public ApiResponse<List<Map<String, Object>>> institutions() {
        return ApiResponse.ok(service.listInstitutions());
    }

    @PostMapping("/institution-accounts")
    public ApiResponse<Map<String, Object>> createInstitution(
        @RequestBody AdminManagementService.InstitutionRequest request
    ) {
        return ApiResponse.ok(service.createInstitution(request));
    }

    @PatchMapping("/institution-accounts/{phone}")
    public ApiResponse<Map<String, Object>> updateInstitution(
        @PathVariable String phone,
        @RequestBody AdminManagementService.InstitutionRequest request
    ) {
        return ApiResponse.ok(service.updateInstitution(phone, request));
    }

    @GetMapping("/operator-accounts")
    public ApiResponse<List<Map<String, Object>>> admins() {
        return ApiResponse.ok(service.listAdmins());
    }

    @PostMapping("/operator-accounts")
    public ApiResponse<Map<String, Object>> createAdmin(
        @RequestBody AdminManagementService.AdminRequest request
    ) {
        return ApiResponse.ok(service.createAdmin(request));
    }

    @PatchMapping("/operator-accounts/{username}")
    public ApiResponse<Map<String, Object>> updateAdmin(
        @PathVariable String username,
        @RequestBody AdminManagementService.AdminRequest request
    ) {
        return ApiResponse.ok(service.updateAdmin(username, request));
    }

    @GetMapping("/hospitals")
    public ApiResponse<List<Map<String, Object>>> hospitals() {
        return ApiResponse.ok(service.listHospitals());
    }

    @PostMapping("/hospitals")
    public ApiResponse<Map<String, Object>> createHospital(
        @RequestBody AdminManagementService.HospitalRequest request
    ) {
        return ApiResponse.ok(service.createHospital(request));
    }

    @PatchMapping("/hospitals/{id}")
    public ApiResponse<Map<String, Object>> updateHospital(
        @PathVariable String id,
        @RequestBody AdminManagementService.HospitalRequest request
    ) {
        return ApiResponse.ok(service.updateHospital(id, request));
    }
}
