package com.pkuih.enterprisehealth.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pkuih.enterprisehealth.domain.AdminAccountEntity;
import com.pkuih.enterprisehealth.domain.ExpertEntity;
import com.pkuih.enterprisehealth.domain.HospitalEntity;
import com.pkuih.enterprisehealth.domain.InstitutionAccountEntity;
import com.pkuih.enterprisehealth.domain.SlotEntity;
import com.pkuih.enterprisehealth.repository.AdminAccountRepository;
import com.pkuih.enterprisehealth.repository.ExpertRepository;
import com.pkuih.enterprisehealth.repository.HospitalRepository;
import com.pkuih.enterprisehealth.repository.InstitutionAccountRepository;
import com.pkuih.enterprisehealth.repository.SlotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final HospitalRepository hospitals;
    private final ExpertRepository experts;
    private final InstitutionAccountRepository institutionAccounts;
    private final AdminAccountRepository adminAccounts;
    private final SlotRepository slots;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedHospitals();
        seedExperts();
        seedAccounts();
        seedSlots();
    }

    private void seedHospitals() throws Exception {
        if (hospitals.count() > 0) return;
        JsonNode rows = read("seed/hospitals.json");
        List<HospitalEntity> entities = new ArrayList<>();
        rows.forEach(row -> entities.add(HospitalEntity.builder()
            .id(row.path("id").asText())
            .name(row.path("name").asText())
            .shortName(row.path("short").asText())
            .province(row.path("province").asText())
            .city(row.path("city").asText())
            .region(row.path("region").asText())
            .address(row.path("address").asText())
            .phone(row.path("phone").asText())
            .flagship(row.path("flagship").asBoolean(false))
            .lat(row.path("lat").asDouble())
            .lng(row.path("lng").asDouble())
            .active(true)
            .build()));
        hospitals.saveAll(entities);
    }

    private void seedExperts() throws Exception {
        if (experts.count() > 0) return;
        JsonNode rows = read("seed/experts.json");
        List<ExpertEntity> entities = new ArrayList<>();
        rows.forEach(row -> entities.add(ExpertEntity.builder()
            .id(row.path("id").asText())
            .no(row.path("no").asText())
            .name(row.path("name").asText())
            .tier(row.path("tier").asText())
            .hospitalId(row.path("hospitalId").asText())
            .hospital(row.path("hospital").asText())
            .dept(row.path("dept").asText())
            .deptTitle(row.path("deptTitle").asText())
            .servicesJson(json(row.path("services")))
            .coverage(row.path("coverage").asText())
            .coverageCitiesJson(json(row.path("coverageCities")))
            .coverageRegionsJson(json(row.path("coverageRegions")))
            .specialty(row.path("specialty").asText())
            .intro(row.path("intro").asText())
            .leadDays(row.path("leadDays").asInt(7))
            .leadLabel(row.path("leadLabel").asText())
            .gender(row.path("gender").asText("neutral"))
            .photo(row.path("photo").asText())
            .photoCard(row.path("photoCard").asText())
            .photoDetail(row.path("photoDetail").asText())
            .profileUrl(row.path("profileUrl").asText())
            .active(row.path("active").asBoolean(true))
            .region(row.path("region").asText())
            .build()));
        experts.saveAll(entities);
    }

    private void seedAccounts() {
        Instant now = Instant.now();
        if (institutionAccounts.count() == 0) {
            institutionAccounts.saveAll(List.of(
                institution("13800000001", "王经理", "示例保险有限公司", "保险公司", "客户健康负责人", "wangjingli@example.com"),
                institution("13800000009", "全链路验收", "全链路测试集团", "企业", "员工健康负责人", "qa.fullflow@example.com"),
                institution("13911112222", "李老师", "华北企业健康中心", "企业", "人力资源负责人", "qa.north@example.com"),
                institution("13911113333", "赵老师", "华东员工关怀中心", "企业", "员工关怀负责人", "qa.east@example.com"),
                institution("13900000001", "孙老师", "大湾区企业健康服务有限公司", "保险公司", "客户服务负责人", "qa.south@example.com")
            ));
        }
        if (adminAccounts.count() == 0) {
            adminAccounts.saveAll(List.of(
                admin("admin", "李老师", "13800009999", "SUPERADMIN", "", now),
                admin("pkuih", "周老师", "13800001111", "OPERATOR", "pkuih", now),
                admin("shenzhen", "陈老师", "13800002222", "OPERATOR", "shenzhen", now)
            ));
        }
    }

    private void seedSlots() {
        if (slots.count() > 0) return;
        LocalDate start = LocalDate.now();
        List<SlotEntity> rows = new ArrayList<>();
        for (ExpertEntity expert : experts.findByActiveTrueOrderByTierAscNameAsc()) {
            int leadDays = expert.getLeadDays() == null ? 7 : expert.getLeadDays();
            for (int offset = leadDays; offset <= leadDays + 60; offset++) {
                LocalDate date = start.plusDays(offset);
                rows.add(SlotEntity.builder()
                    .id(expert.getId() + "|" + date)
                    .doctorId(expert.getId())
                    .date(date)
                    .capacity(2)
                    .build());
            }
        }
        slots.saveAll(rows);
    }

    private InstitutionAccountEntity institution(
        String phone,
        String name,
        String orgName,
        String orgType,
        String title,
        String email
    ) {
        Instant now = Instant.now();
        return InstitutionAccountEntity.builder()
            .phone(phone)
            .name(name)
            .orgName(orgName)
            .orgType(orgType)
            .title(title)
            .contactPhone(phone)
            .email(email)
            .province("北京市")
            .city("北京市")
            .active(true)
            .createdAt(now)
            .updatedAt(now)
            .build();
    }

    private AdminAccountEntity admin(
        String username,
        String name,
        String phone,
        String role,
        String hospitalId,
        Instant now
    ) {
        return AdminAccountEntity.builder()
            .username(username)
            .passwordHash(passwordEncoder.encode("pkuih2026"))
            .name(name)
            .phone(phone)
            .role(role)
            .hospitalId(hospitalId)
            .active(true)
            .createdAt(now)
            .updatedAt(now)
            .build();
    }

    private JsonNode read(String path) throws Exception {
        try (var stream = new ClassPathResource(path).getInputStream()) {
            return objectMapper.readTree(stream);
        }
    }

    private String json(JsonNode node) {
        return node == null || node.isMissingNode() ? "[]" : node.toString();
    }
}
