package com.pkuih.enterprisehealth.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admin_accounts")
public class AdminAccountEntity {
    @Id
    private String username;
    private String passwordHash;
    private String name;
    private String phone;
    private String role;
    private String hospitalId;
    private Boolean active;
    private Instant createdAt;
    private Instant updatedAt;
}
