package com.pkuih.enterprisehealth.common;

import java.util.UUID;

public record ApiResponse<T>(Object code, String message, T data, String requestId) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(0, "ok", data, newRequestId());
    }

    public static ApiResponse<Void> ok() {
        return new ApiResponse<>(0, "ok", null, newRequestId());
    }

    public static ApiResponse<Void> error(String code, String message, String requestId) {
        return new ApiResponse<>(code, message, null, requestId);
    }

    private static String newRequestId() {
        return UUID.randomUUID().toString();
    }
}
