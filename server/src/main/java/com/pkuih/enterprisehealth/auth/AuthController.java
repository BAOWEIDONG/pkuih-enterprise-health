package com.pkuih.enterprisehealth.auth;

import com.pkuih.enterprisehealth.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @GetMapping("/csrf")
    public ApiResponse<Map<String, String>> csrf(CsrfToken token) {
        return ApiResponse.ok(Map.of("token", token.getToken()));
    }

    @PostMapping("/institution/sms-code")
    public ApiResponse<Map<String, Object>> smsCode(@Valid @RequestBody SmsCodeRequest request) {
        return ApiResponse.ok(authService.sendInstitutionCode(request.phone()));
    }

    @PostMapping("/institution/login")
    public ApiResponse<AuthService.AuthView> institutionLogin(
        @Valid @RequestBody InstitutionLoginRequest request,
        HttpServletRequest servletRequest,
        HttpServletResponse servletResponse
    ) {
        return ApiResponse.ok(authService.loginInstitution(
            request.phone(),
            request.code(),
            request.profile(),
            servletRequest,
            servletResponse
        ));
    }

    @PostMapping("/admin/login")
    public ApiResponse<AuthService.AuthView> adminLogin(
        @Valid @RequestBody AdminLoginRequest request,
        HttpServletRequest servletRequest,
        HttpServletResponse servletResponse
    ) {
        return ApiResponse.ok(authService.loginAdmin(
            request.username(),
            request.password(),
            servletRequest,
            servletResponse
        ));
    }

    @GetMapping("/session")
    public ApiResponse<AuthService.AuthView> session() {
        return ApiResponse.ok(authService.current());
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpServletRequest request) {
        authService.logout(request);
        return ApiResponse.ok();
    }

    public record SmsCodeRequest(@NotBlank(message = "请输入手机号") String phone) {}

    public record InstitutionLoginRequest(
        @NotBlank(message = "请输入手机号") String phone,
        @NotBlank(message = "请输入验证码") String code,
        Map<String, Object> profile
    ) {}

    public record AdminLoginRequest(
        @NotBlank(message = "请输入用户名") String username,
        @NotBlank(message = "请输入密码") String password
    ) {}
}
