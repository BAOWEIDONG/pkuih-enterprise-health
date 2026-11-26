package com.pkuih.enterprisehealth.catalog;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pkuih.enterprisehealth.domain.ExpertEntity;
import com.pkuih.enterprisehealth.domain.HospitalEntity;
import com.pkuih.enterprisehealth.repository.ExpertRepository;
import com.pkuih.enterprisehealth.repository.HospitalRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CatalogService {
    private final HospitalRepository hospitals;
    private final ExpertRepository experts;
    private final ObjectMapper objectMapper;

    private JsonNode seasonal;
    private JsonNode themeMatches;
    private JsonNode chinaCities;

    @PostConstruct
    void loadStaticData() throws IOException {
        seasonal = readResource("seed/seasonal.json");
        themeMatches = readResource("seed/theme-matches.json");
        chinaCities = readResource("seed/china-cities.json");
    }

    public Map<String, Object> bootstrap() {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("hospitals", hospitals.findByActiveTrueOrderByNameAsc().stream().map(this::hospitalMap).toList());
        payload.put("experts", experts.findByActiveTrueOrderByTierAscNameAsc().stream().map(this::expertMap).toList());
        payload.put("seasonal", seasonal);
        payload.put("themeMatches", themeMatches);
        payload.put("chinaCities", chinaCities);
        return payload;
    }

    public List<Map<String, Object>> hospitalList() {
        return hospitals.findByActiveTrueOrderByNameAsc().stream().map(this::hospitalMap).toList();
    }

    public List<Map<String, Object>> expertList(String hospitalId, String service, String city) {
        List<ExpertEntity> source = hospitalId == null || hospitalId.isBlank()
            ? experts.findByActiveTrueOrderByTierAscNameAsc()
            : experts.findByHospitalIdAndActiveTrueOrderByTierAscNameAsc(hospitalId);
        return source.stream()
            .filter(expert -> service == null || service.isBlank() ||
                jsonList(expert.getServicesJson()).contains(service))
            .filter(expert -> city == null || city.isBlank() ||
                coversCity(expert.getCoverageCitiesJson(), city))
            .map(this::expertMap)
            .toList();
    }

    public ExpertEntity requireExpert(String id) {
        return experts.findById(id)
            .filter(expert -> Boolean.TRUE.equals(expert.getActive()))
            .orElseThrow(() -> com.pkuih.enterprisehealth.common.ApiException.notFound(
                "EXPERT_NOT_FOUND",
                "专家不存在或已下架。"
            ));
    }

    public HospitalEntity requireHospital(String id) {
        return hospitals.findById(id)
            .filter(hospital -> Boolean.TRUE.equals(hospital.getActive()))
            .orElseThrow(() -> com.pkuih.enterprisehealth.common.ApiException.notFound(
                "HOSPITAL_NOT_FOUND",
                "医院不存在或已停用。"
            ));
    }

    public Map<String, Object> hospitalMap(HospitalEntity hospital) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", hospital.getId());
        map.put("name", hospital.getName());
        map.put("short", hospital.getShortName());
        map.put("province", hospital.getProvince());
        map.put("city", hospital.getCity());
        map.put("region", hospital.getRegion());
        map.put("address", hospital.getAddress());
        map.put("phone", hospital.getPhone());
        map.put("flagship", Boolean.TRUE.equals(hospital.getFlagship()));
        map.put("lat", hospital.getLat());
        map.put("lng", hospital.getLng());
        map.put("active", !Boolean.FALSE.equals(hospital.getActive()));
        return map;
    }

    public Map<String, Object> expertMap(ExpertEntity expert) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", expert.getId());
        map.put("no", expert.getNo());
        map.put("name", expert.getName());
        map.put("tier", expert.getTier());
        map.put("hospitalId", expert.getHospitalId());
        map.put("hospital", expert.getHospital());
        map.put("dept", expert.getDept());
        map.put("deptTitle", expert.getDeptTitle());
        map.put("services", jsonList(expert.getServicesJson()));
        map.put("coverage", expert.getCoverage());
        map.put("coverageCities", jsonList(expert.getCoverageCitiesJson()));
        map.put("coverageRegions", jsonList(expert.getCoverageRegionsJson()));
        map.put("specialty", expert.getSpecialty());
        map.put("intro", expert.getIntro());
        map.put("leadDays", expert.getLeadDays());
        map.put("leadLabel", expert.getLeadLabel());
        map.put("gender", expert.getGender());
        map.put("photo", expert.getPhoto());
        map.put("photoCard", expert.getPhotoCard());
        map.put("photoDetail", expert.getPhotoDetail());
        map.put("profileUrl", expert.getProfileUrl());
        map.put("active", !Boolean.FALSE.equals(expert.getActive()));
        map.put("region", expert.getRegion());
        return map;
    }

    public List<String> jsonList(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            JsonNode node = objectMapper.readTree(json);
            if (!node.isArray()) return List.of();
            List<String> values = new ArrayList<>();
            node.forEach(item -> {
                if (!item.asText().isBlank()) values.add(item.asText());
            });
            return values;
        } catch (Exception exception) {
            return List.of();
        }
    }

    public String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception exception) {
            throw new IllegalArgumentException("JSON 序列化失败", exception);
        }
    }

    private boolean coversCity(String coverageJson, String city) {
        List<String> cities = jsonList(coverageJson);
        return cities.stream().anyMatch(item ->
            item.equals("全国") ||
                item.equals(city) ||
                item.contains("省外") ||
                item.contains("京外")
        );
    }

    private JsonNode readResource(String path) throws IOException {
        try (var stream = new ClassPathResource(path).getInputStream()) {
            return objectMapper.readTree(stream);
        }
    }
}
