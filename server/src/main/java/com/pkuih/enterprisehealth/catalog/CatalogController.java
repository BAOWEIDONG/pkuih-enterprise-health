package com.pkuih.enterprisehealth.catalog;

import com.pkuih.enterprisehealth.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CatalogController {
    private final CatalogService catalogService;

    @GetMapping("/bootstrap")
    public ApiResponse<Map<String, Object>> bootstrap() {
        return ApiResponse.ok(catalogService.bootstrap());
    }

    @GetMapping("/hospitals")
    public ApiResponse<List<Map<String, Object>>> hospitals() {
        return ApiResponse.ok(catalogService.hospitalList());
    }

    @GetMapping("/experts")
    public ApiResponse<List<Map<String, Object>>> experts(
        @RequestParam(required = false) String hospitalId,
        @RequestParam(required = false) String service,
        @RequestParam(required = false) String city
    ) {
        return ApiResponse.ok(catalogService.expertList(hospitalId, service, city));
    }
}
