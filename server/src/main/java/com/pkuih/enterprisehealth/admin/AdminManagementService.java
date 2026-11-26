package com.pkuih.enterprisehealth.admin;

import com.pkuih.enterprisehealth.auth.AuthService;
import com.pkuih.enterprisehealth.auth.UserPrincipal;
import com.pkuih.enterprisehealth.catalog.CatalogService;
import com.pkuih.enterprisehealth.common.ApiException;
import com.pkuih.enterprisehealth.domain.AdminAccountEntity;
import com.pkuih.enterprisehealth.domain.HospitalEntity;
import com.pkuih.enterprisehealth.domain.InstitutionAccountEntity;
import com.pkuih.enterprisehealth.repository.AdminAccountRepository;
import com.pkuih.enterprisehealth.repository.HospitalRepository;
import com.pkuih.enterprisehealth.repository.InstitutionAccountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminManagementService {
    private static final Set<String> ADMIN_ROLES = Set.of("SUPERADMIN", "OPERATOR");

    private final InstitutionAccountRepository institutionAccounts;
    private final AdminAccountRepository adminAccounts;
    private final HospitalRepository hospitals;
    private final PasswordEncoder passwordEncoder;
    private final CatalogService catalogService;
    private final AuthService authService;

    public List<Map<String, Object>> listInstitutions() {
        requireSuperadmin(authService.currentPrincipal());
        return institutionAccounts.findAllByOrderByCreatedAtDesc().stream()
            .map(this::institutionView)
            .toList();
    }

    @Transactional
    public Map<String, Object> createInstitution(InstitutionRequest request) {
        requireSuperadmin(authService.currentPrincipal());
        String phone = requiredPhone(request.phone());
        if (institutionAccounts.existsById(phone)) {
            throw ApiException.conflict("ACCOUNT_EXISTS", "该手机号已开通机构账号。");
        }
        if (blank(request.name())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写联系人姓名。");
        }
        Instant now = Instant.now();
        InstitutionAccountEntity account = InstitutionAccountEntity.builder()
            .phone(phone)
            .name(request.name().trim())
            .orgName(value(request.orgName()))
            .orgType(value(request.orgType()))
            .title(value(request.title()))
            .contactPhone(valueOrDefault(request.contactPhone(), phone))
            .email(value(request.email()))
            .province(value(request.province()))
            .city(value(request.city()))
            .active(request.active() == null || request.active())
            .createdAt(now)
            .updatedAt(now)
            .build();
        institutionAccounts.save(account);
        return institutionView(account);
    }

    @Transactional
    public Map<String, Object> updateInstitution(String phone, InstitutionRequest request) {
        requireSuperadmin(authService.currentPrincipal());
        InstitutionAccountEntity account = institutionAccounts.findById(requiredPhone(phone))
            .orElseThrow(() -> ApiException.notFound("ACCOUNT_NOT_FOUND", "机构账号不存在。"));
        if (request.name() != null) {
            if (blank(request.name())) {
                throw ApiException.badRequest("VALIDATION_ERROR", "联系人姓名不能为空。");
            }
            account.setName(request.name().trim());
        }
        if (request.orgName() != null) account.setOrgName(request.orgName().trim());
        if (request.orgType() != null) account.setOrgType(request.orgType().trim());
        if (request.title() != null) account.setTitle(request.title().trim());
        if (request.contactPhone() != null) account.setContactPhone(requiredPhone(request.contactPhone()));
        if (request.email() != null) account.setEmail(request.email().trim());
        if (request.province() != null) account.setProvince(request.province().trim());
        if (request.city() != null) account.setCity(request.city().trim());
        if (request.active() != null) account.setActive(request.active());
        account.setUpdatedAt(Instant.now());
        institutionAccounts.save(account);
        return institutionView(account);
    }

    public List<Map<String, Object>> listAdmins() {
        requireSuperadmin(authService.currentPrincipal());
        return adminAccounts.findAllByOrderByRoleAscNameAsc().stream()
            .map(this::adminView)
            .toList();
    }

    @Transactional
    public Map<String, Object> createAdmin(AdminRequest request) {
        requireSuperadmin(authService.currentPrincipal());
        if (blank(request.username()) || blank(request.password())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "登录账号和初始密码为必填项。");
        }
        String username = request.username().trim();
        if (adminAccounts.existsById(username)) {
            throw ApiException.conflict("ACCOUNT_EXISTS", "该院方登录账号已存在。");
        }
        String role = validRole(request.role());
        String hospitalId = validHospitalId(role, request.hospitalId());
        if (blank(request.name())) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请填写账号姓名。");
        }
        Instant now = Instant.now();
        AdminAccountEntity account = AdminAccountEntity.builder()
            .username(username)
            .passwordHash(passwordEncoder.encode(request.password()))
            .name(request.name().trim())
            .phone(requiredPhone(request.phone()))
            .role(role)
            .hospitalId(hospitalId)
            .active(request.active() == null || request.active())
            .createdAt(now)
            .updatedAt(now)
            .build();
        adminAccounts.save(account);
        return adminView(account);
    }

    @Transactional
    public Map<String, Object> updateAdmin(String username, AdminRequest request) {
        UserPrincipal principal = authService.currentPrincipal();
        requireSuperadmin(principal);
        AdminAccountEntity account = adminAccounts.findById(username)
            .orElseThrow(() -> ApiException.notFound("ACCOUNT_NOT_FOUND", "院方账号不存在。"));
        String role = request.role() == null ? account.getRole() : validRole(request.role());
        boolean active = request.active() == null ? Boolean.TRUE.equals(account.getActive()) : request.active();
        if (username.equals(principal.id()) && (!active || !"SUPERADMIN".equals(role))) {
            throw ApiException.badRequest("SELF_ACCOUNT_LOCKOUT", "不能停用当前账号或移除自己的超级管理员角色。");
        }
        if (Boolean.TRUE.equals(account.getActive()) &&
            "SUPERADMIN".equals(account.getRole()) &&
            (!"SUPERADMIN".equals(role) || !active) &&
            adminAccounts.countByRoleAndActiveTrue("SUPERADMIN") <= 1) {
            throw ApiException.conflict("LAST_SUPERADMIN", "系统必须至少保留一个启用的超级管理员。");
        }
        String hospitalId = validHospitalId(role, request.hospitalId() == null ? account.getHospitalId() : request.hospitalId());
        if (request.name() != null) {
            if (blank(request.name())) {
                throw ApiException.badRequest("VALIDATION_ERROR", "账号姓名不能为空。");
            }
            account.setName(request.name().trim());
        }
        if (request.phone() != null) account.setPhone(requiredPhone(request.phone()));
        if (!blank(request.password())) account.setPasswordHash(passwordEncoder.encode(request.password()));
        account.setRole(role);
        account.setHospitalId(hospitalId);
        account.setActive(active);
        account.setUpdatedAt(Instant.now());
        adminAccounts.save(account);
        return adminView(account);
    }

    public List<Map<String, Object>> listHospitals() {
        requireSuperadmin(authService.currentPrincipal());
        return hospitals.findAll().stream()
            .sorted((left, right) -> left.getName().compareToIgnoreCase(right.getName()))
            .map(catalogService::hospitalMap)
            .toList();
    }

    @Transactional
    public Map<String, Object> createHospital(HospitalRequest request) {
        requireSuperadmin(authService.currentPrincipal());
        requireHospitalFields(request.name(), request.province(), request.city(), request.address());
        validateCoordinates(request.lat(), request.lng());
        String id = blank(request.id())
            ? "hospital-" + UUID.randomUUID().toString().replace("-", "").substring(0, 10)
            : request.id().trim();
        if (hospitals.existsById(id)) {
            throw ApiException.conflict("HOSPITAL_EXISTS", "医院 ID 已存在。");
        }
        HospitalEntity hospital = HospitalEntity.builder()
            .id(id)
            .name(request.name().trim())
            .shortName(valueOrDefault(request.shortName(), request.name().trim()))
            .province(request.province().trim())
            .city(request.city().trim())
            .region(valueOrDefault(request.region(), request.city().trim()))
            .address(request.address().trim())
            .phone(value(request.phone()))
            .flagship(Boolean.TRUE.equals(request.flagship()))
            .lat(request.lat())
            .lng(request.lng())
            .active(request.active() == null || request.active())
            .build();
        hospitals.save(hospital);
        return catalogService.hospitalMap(hospital);
    }

    @Transactional
    public Map<String, Object> updateHospital(String id, HospitalRequest request) {
        requireSuperadmin(authService.currentPrincipal());
        HospitalEntity hospital = hospitals.findById(id)
            .orElseThrow(() -> ApiException.notFound("HOSPITAL_NOT_FOUND", "医院不存在。"));
        if (request.name() != null) {
            if (blank(request.name())) throw ApiException.badRequest("VALIDATION_ERROR", "医院名称不能为空。");
            hospital.setName(request.name().trim());
        }
        if (request.shortName() != null) hospital.setShortName(request.shortName().trim());
        if (request.province() != null) hospital.setProvince(request.province().trim());
        if (request.city() != null) hospital.setCity(request.city().trim());
        if (request.region() != null) hospital.setRegion(request.region().trim());
        if (request.address() != null) hospital.setAddress(request.address().trim());
        if (request.phone() != null) hospital.setPhone(request.phone().trim());
        if (request.flagship() != null) hospital.setFlagship(request.flagship());
        if (request.lat() != null || request.lng() != null) {
            Double lat = request.lat() == null ? hospital.getLat() : request.lat();
            Double lng = request.lng() == null ? hospital.getLng() : request.lng();
            validateCoordinates(lat, lng);
            hospital.setLat(lat);
            hospital.setLng(lng);
        }
        if (request.active() != null) hospital.setActive(request.active());
        hospitals.save(hospital);
        return catalogService.hospitalMap(hospital);
    }

    private void requireSuperadmin(UserPrincipal principal) {
        if (!"SUPERADMIN".equals(principal.role())) {
            throw ApiException.forbidden("仅超级管理员可以维护医院与账号。");
        }
    }

    private String validRole(String role) {
        if (blank(role) || !ADMIN_ROLES.contains(role)) {
            throw ApiException.badRequest("VALIDATION_ERROR", "院方账号角色不正确。");
        }
        return role;
    }

    private String validHospitalId(String role, String hospitalId) {
        if ("SUPERADMIN".equals(role)) return "";
        if (blank(hospitalId)) {
            throw ApiException.badRequest("VALIDATION_ERROR", "医院运营账号必须绑定医院。");
        }
        catalogService.requireHospital(hospitalId);
        return hospitalId;
    }

    private String requiredPhone(String phone) {
        String value = value(phone);
        if (!value.matches("\\d{11}")) {
            throw ApiException.badRequest("VALIDATION_ERROR", "请输入 11 位手机号。");
        }
        return value;
    }

    private void requireHospitalFields(String name, String province, String city, String address) {
        if (blank(name) || blank(province) || blank(city) || blank(address)) {
            throw ApiException.badRequest("VALIDATION_ERROR", "医院名称、省市和地址为必填项。");
        }
    }

    private void validateCoordinates(Double lat, Double lng) {
        if (lat != null && (lat < -90 || lat > 90)) {
            throw ApiException.badRequest("VALIDATION_ERROR", "纬度必须在 -90 到 90 之间。");
        }
        if (lng != null && (lng < -180 || lng > 180)) {
            throw ApiException.badRequest("VALIDATION_ERROR", "经度必须在 -180 到 180 之间。");
        }
    }

    private Map<String, Object> institutionView(InstitutionAccountEntity account) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("phone", account.getPhone());
        map.put("name", value(account.getName()));
        map.put("orgName", value(account.getOrgName()));
        map.put("orgType", value(account.getOrgType()));
        map.put("title", value(account.getTitle()));
        map.put("contactPhone", value(account.getContactPhone()));
        map.put("email", value(account.getEmail()));
        map.put("province", value(account.getProvince()));
        map.put("city", value(account.getCity()));
        map.put("active", Boolean.TRUE.equals(account.getActive()));
        map.put("createdAt", account.getCreatedAt());
        map.put("updatedAt", account.getUpdatedAt());
        return map;
    }

    private Map<String, Object> adminView(AdminAccountEntity account) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("username", account.getUsername());
        map.put("name", value(account.getName()));
        map.put("phone", value(account.getPhone()));
        map.put("role", account.getRole());
        map.put("hospitalId", value(account.getHospitalId()));
        map.put("active", Boolean.TRUE.equals(account.getActive()));
        map.put("createdAt", account.getCreatedAt());
        map.put("updatedAt", account.getUpdatedAt());
        return map;
    }

    private String valueOrDefault(String value, String fallback) {
        return blank(value) ? fallback : value.trim();
    }

    private String value(String value) {
        return value == null ? "" : value.trim();
    }

    private boolean blank(String value) {
        return value == null || value.isBlank();
    }

    public record InstitutionRequest(
        String phone,
        String name,
        String orgName,
        String orgType,
        String title,
        String contactPhone,
        String email,
        String province,
        String city,
        Boolean active
    ) {}

    public record AdminRequest(
        String username,
        String password,
        String name,
        String phone,
        String role,
        String hospitalId,
        Boolean active
    ) {}

    public record HospitalRequest(
        String id,
        String name,
        String shortName,
        String province,
        String city,
        String region,
        String address,
        String phone,
        Double lat,
        Double lng,
        Boolean flagship,
        Boolean active
    ) {}
}
