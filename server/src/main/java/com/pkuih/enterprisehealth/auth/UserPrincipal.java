package com.pkuih.enterprisehealth.auth;

import java.util.List;

public record UserPrincipal(
    String id,
    String displayName,
    String phone,
    String role,
    String hospitalId,
    boolean enabled
) {
    public List<String> authorities() {
        return List.of("ROLE_" + role);
    }
}
