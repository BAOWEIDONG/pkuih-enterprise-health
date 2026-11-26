package com.pkuih.enterprisehealth.slot;

import com.pkuih.enterprisehealth.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/slots")
@RequiredArgsConstructor
public class SlotController {
    private final SlotService slotService;

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list(
        @RequestParam String doctorId,
        @RequestParam(required = false) LocalDate from,
        @RequestParam(required = false) LocalDate to
    ) {
        return ApiResponse.ok(slotService.list(doctorId, from, to));
    }

    @PutMapping("/batch")
    @PreAuthorize("hasAnyRole('SUPERADMIN','OPERATOR')")
    public ApiResponse<Map<String, Object>> batch(@Valid @RequestBody SlotService.BatchSlotRequest request) {
        return ApiResponse.ok(slotService.batchSave(request));
    }
}
