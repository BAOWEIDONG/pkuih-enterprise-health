package com.pkuih.enterprisehealth.catalog;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoverageService {
    public boolean covers(List<String> coverages, String province, String city) {
        if (coverages == null || coverages.isEmpty()) return false;
        String normalizedProvince = normalize(province);
        String normalizedCity = normalize(city);
        for (String raw : coverages) {
            if (raw == null || raw.isBlank()) continue;
            String value = raw.trim();
            if (value.contains("全国")) return true;
            if (value.contains("内、省外") || value.contains("内,省外")) return true;
            if (value.contains("省外")) {
                String sourceProvince = value.replace("省外", "").replace("内、", "").replace("、", "").trim();
                if (!sourceProvince.isBlank() && !normalizedProvince.equals(normalize(sourceProvince))) return true;
            }
            if (value.contains("京外") && !normalizedProvince.equals("北京")) return true;
            for (String part : value.split("[/、,，]")) {
                String candidate = normalize(part);
                if (candidate.isBlank()) continue;
                if (candidate.equals(normalizedCity) || candidate.equals(normalizedProvince)) return true;
            }
        }
        return false;
    }

    private String normalize(String value) {
        if (value == null) return "";
        return value
            .replace("壮族自治区", "")
            .replace("回族自治区", "")
            .replace("维吾尔自治区", "")
            .replace("自治区", "")
            .replace("特别行政区", "")
            .replace("省", "")
            .replace("市", "")
            .trim();
    }
}
