package com.pkuih.enterprisehealth.demand;

import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/demands")
@RequiredArgsConstructor
public class DemandController {
    private final DemandService demandService;
    private final AuthService authService;

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ApiResponse.ok(demandService.list(authService.currentPrincipal()));
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTITUTION')")
    public ApiResponse<Map<String, Object>> create(@RequestBody DemandService.CreateDemandRequest request) {
        return ApiResponse.ok(demandService.create(authService.currentPrincipal(), request));
    }

    @GetMapping("/{id}")
    public ApiResponse<Map<String, Object>> detail(@PathVariable String id) {
        return ApiResponse.ok(demandService.detail(authService.currentPrincipal(), id));
    }

    @PostMapping("/{id}/contact")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> contact(
        @PathVariable String id,
        @RequestBody(required = false) Map<String, String> body
    ) {
        return ApiResponse.ok(
            demandService.contact(authService.currentPrincipal(), id, body == null ? null : body.get("note"))
        );
    }

    @PostMapping("/{id}/match")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> match(
        @PathVariable String id,
        @RequestBody DemandService.MatchRequest request
    ) {
        return ApiResponse.ok(demandService.match(authService.currentPrincipal(), id, request));
    }

    @PostMapping("/{id}/close")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> close(
        @PathVariable String id,
        @RequestBody(required = false) Map<String, String> body
    ) {
        return ApiResponse.ok(
            demandService.close(authService.currentPrincipal(), id, body == null ? null : body.get("reason"))
        );
    }
}
