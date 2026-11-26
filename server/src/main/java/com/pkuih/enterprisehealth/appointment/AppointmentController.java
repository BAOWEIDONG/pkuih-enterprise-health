package com.pkuih.enterprisehealth.appointment;

import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AuthService authService;

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ApiResponse.ok(appointmentService.list(authService.currentPrincipal()));
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTITUTION')")
    public ApiResponse<Map<String, Object>> create(
        @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey,
        @Valid @RequestBody AppointmentService.CreateAppointmentRequest request
    ) {
        return ApiResponse.ok(
            appointmentService.create(authService.currentPrincipal(), idempotencyKey, request)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<Map<String, Object>> detail(@PathVariable String id) {
        return ApiResponse.ok(appointmentService.detail(authService.currentPrincipal(), id));
    }

    @PostMapping("/{id}/accept")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> accept(@PathVariable String id) {
        return ApiResponse.ok(appointmentService.accept(authService.currentPrincipal(), id));
    }

    @PutMapping("/{id}/plan")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> plan(
        @PathVariable String id,
        @RequestBody Map<String, Object> plan
    ) {
        return ApiResponse.ok(appointmentService.savePlan(authService.currentPrincipal(), id, plan));
    }

    @PostMapping("/{id}/confirm")
    @PreAuthorize("hasRole('INSTITUTION')")
    public ApiResponse<Map<String, Object>> confirm(@PathVariable String id) {
        return ApiResponse.ok(appointmentService.confirm(authService.currentPrincipal(), id));
    }

    @PostMapping("/{id}/revisions")
    @PreAuthorize("hasRole('INSTITUTION')")
    public ApiResponse<Map<String, Object>> revision(
        @PathVariable String id,
        @RequestBody Map<String, String> body
    ) {
        return ApiResponse.ok(
            appointmentService.requestRevision(authService.currentPrincipal(), id, body.get("feedback"))
        );
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('INSTITUTION')")
    public ApiResponse<Map<String, Object>> cancel(
        @PathVariable String id,
        @RequestBody(required = false) Map<String, String> body
    ) {
        String reason = body == null ? "" : body.getOrDefault("reason", "");
        return ApiResponse.ok(appointmentService.cancel(authService.currentPrincipal(), id, reason));
    }

    @PatchMapping("/{id}/location")
    @PreAuthorize("hasRole('INSTITUTION')")
    public ApiResponse<Map<String, Object>> location(
        @PathVariable String id,
        @RequestBody AppointmentService.LocationRequest request
    ) {
        return ApiResponse.ok(appointmentService.updateLocation(authService.currentPrincipal(), id, request));
    }

    @PatchMapping("/{id}/internal-note")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> internalNote(
        @PathVariable String id,
        @RequestBody Map<String, String> body
    ) {
        return ApiResponse.ok(
            appointmentService.saveInternalNote(authService.currentPrincipal(), id, body.get("note"))
        );
    }

    @PostMapping("/{id}/complete")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> complete(@PathVariable String id) {
        return ApiResponse.ok(appointmentService.complete(authService.currentPrincipal(), id));
    }
}
