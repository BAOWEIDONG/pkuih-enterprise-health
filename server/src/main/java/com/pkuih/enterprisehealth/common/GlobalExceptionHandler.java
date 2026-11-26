package com.pkuih.enterprisehealth.common;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import jakarta.persistence.OptimisticLockException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<Void>> handleApi(ApiException exception, HttpServletRequest request) {
        return ResponseEntity.status(exception.getStatus()).body(
            ApiResponse.error(exception.getCode(), exception.getMessage(), requestId(request))
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(
        MethodArgumentNotValidException exception,
        HttpServletRequest request
    ) {
        Map<String, String> fields = new LinkedHashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            fields.putIfAbsent(error.getField(), error.getDefaultMessage());
        }
        ApiResponse<Map<String, String>> response = new ApiResponse<>(
            "VALIDATION_ERROR",
            fields.values().stream().findFirst().orElse("参数校验失败"),
            fields,
            requestId(request)
        );
        return ResponseEntity.unprocessableEntity().body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleForbidden(AccessDeniedException exception, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
            ApiResponse.error("FORBIDDEN", "无权执行该操作。", requestId(request))
        );
    }

    @ExceptionHandler({
        ObjectOptimisticLockingFailureException.class,
        OptimisticLockException.class,
        PessimisticLockingFailureException.class
    })
    public ResponseEntity<ApiResponse<Void>> handleConcurrentUpdate(
        RuntimeException exception,
        HttpServletRequest request
    ) {
        log.warn("Concurrent update rejected, requestId={}", requestId(request), exception);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
            ApiResponse.error("CONCURRENT_UPDATE", "数据已被其他用户更新，请刷新后重试。", requestId(request))
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleDataConflict(
        DataIntegrityViolationException exception,
        HttpServletRequest request
    ) {
        log.warn("Data integrity conflict, requestId={}", requestId(request), exception);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
            ApiResponse.error("DATA_CONFLICT", "数据已存在或已被其他操作更新，请刷新后重试。", requestId(request))
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleUnknown(Exception exception, HttpServletRequest request) {
        log.error("Unhandled exception, requestId={}", requestId(request), exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            ApiResponse.error("INTERNAL_ERROR", "服务暂时不可用，请稍后重试。", requestId(request))
        );
    }

    private String requestId(HttpServletRequest request) {
        String requestId = request.getHeader("X-Request-Id");
        return requestId == null || requestId.isBlank() ? UUID.randomUUID().toString() : requestId;
    }
}
