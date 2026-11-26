package com.pkuih.enterprisehealth.auth;

import com.pkuih.enterprisehealth.common.ApiException;
import com.pkuih.enterprisehealth.domain.AdminAccountEntity;
import com.pkuih.enterprisehealth.domain.InstitutionAccountEntity;
import com.pkuih.enterprisehealth.repository.AdminAccountRepository;
import com.pkuih.enterprisehealth.repository.InstitutionAccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final InstitutionAccountRepository institutionAccounts;
    private final AdminAccountRepository adminAccounts;
    private final PasswordEncoder passwordEncoder;
    private final SecurityContextRepository securityContextRepository;

    @Value("${app.demo-code}")
    private String demoCode;

    public Map<String, Object> sendInstitutionCode(String phone) {
        InstitutionAccountEntity account = institutionAccounts.findById(phone)
            .orElseThrow(() -> ApiException.notFound("ACCOUNT_NOT_FOUND", "该手机号尚未开通机构账号。"));
        if (!Boolean.TRUE.equals(account.getActive())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "ACCOUNT_DISABLED", "该机构账号已停用。");
        }
        return Map.of("expiresIn", 300, "demoCodeEnabled", true);
    }

    public AuthView loginInstitution(
        String phone,
        String code,
        Map<String, Object> profile,
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        if (!demoCode.equals(code)) {
            throw ApiException.badRequest("INVALID_CODE", "验证码不正确或已过期。");
        }
        InstitutionAccountEntity account = institutionAccounts.findById(phone)
            .orElseThrow(() -> ApiException.notFound("ACCOUNT_NOT_FOUND", "该手机号尚未开通机构账号。"));
        if (!Boolean.TRUE.equals(account.getActive())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "ACCOUNT_DISABLED", "该机构账号已停用。");
        }
        applyProfile(account, profile);
        institutionAccounts.save(account);

        UserPrincipal principal = new UserPrincipal(
            account.getPhone(),
            account.getName(),
            account.getPhone(),
            "INSTITUTION",
            "",
            true
        );
        authenticate(principal, request, response);
        return AuthView.of(principal, account);
    }

    public AuthView loginAdmin(
        String username,
        String password,
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        AdminAccountEntity account = adminAccounts.findById(username)
            .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "AUTH_FAILED", "用户名或密码错误。"));
        if (!Boolean.TRUE.equals(account.getActive()) ||
            !passwordEncoder.matches(password, account.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTH_FAILED", "用户名或密码错误。");
        }
        UserPrincipal principal = new UserPrincipal(
            account.getUsername(),
            account.getName(),
            account.getPhone(),
            account.getRole(),
            account.getHospitalId() == null ? "" : account.getHospitalId(),
            true
        );
        authenticate(principal, request, response);
        return AuthView.of(principal, null);
    }

    public AuthView current() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTH_REQUIRED", "请先登录。");
        }
        InstitutionAccountEntity account =
            "INSTITUTION".equals(principal.role()) ? institutionAccounts.findById(principal.id()).orElse(null) : null;
        return AuthView.of(principal, account);
    }

    public UserPrincipal currentPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTH_REQUIRED", "请先登录。");
        }
        return principal;
    }

    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();
        SecurityContextHolder.clearContext();
    }

    private void authenticate(UserPrincipal principal, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            principal,
            null,
            principal.authorities().stream().map(SimpleGrantedAuthority::new).toList()
        );
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        HttpSession session = request.getSession(true);
        request.changeSessionId();
        securityContextRepository.saveContext(context, request, response);
    }

    private void applyProfile(InstitutionAccountEntity account, Map<String, Object> profile) {
        if (profile == null) return;
        account.setName(text(profile.get("name"), account.getName()));
        account.setOrgName(text(profile.get("orgName"), account.getOrgName()));
        account.setOrgType(text(profile.get("orgType"), account.getOrgType()));
        account.setTitle(text(profile.get("title"), account.getTitle()));
        account.setContactPhone(text(profile.get("contactPhone"), account.getContactPhone()));
        account.setEmail(text(profile.get("email"), account.getEmail()));
        account.setProvince(text(profile.get("province"), account.getProvince()));
        account.setCity(text(profile.get("city"), account.getCity()));
        account.setUpdatedAt(Instant.now());
    }

    private String text(Object value, String fallback) {
        if (value == null) return fallback;
        String text = String.valueOf(value).trim();
        return text.isEmpty() ? fallback : text;
    }

    public record AuthView(
        String id,
        String name,
        String phone,
        String role,
        String hospitalId,
        Map<String, Object> institution
    ) {
        static AuthView of(UserPrincipal principal, InstitutionAccountEntity account) {
            return new AuthView(
                principal.id(),
                principal.displayName(),
                principal.phone(),
                principal.role(),
                principal.hospitalId(),
                account == null ? null : Map.of(
                    "phone", account.getPhone(),
                    "name", value(account.getName()),
                    "orgName", value(account.getOrgName()),
                    "orgType", value(account.getOrgType()),
                    "title", value(account.getTitle()),
                    "contactPhone", value(account.getContactPhone()),
                    "email", value(account.getEmail()),
                    "province", value(account.getProvince()),
                    "city", value(account.getCity())
                )
            );
        }

        private static String value(String value) {
            return value == null ? "" : value;
        }
    }
}
