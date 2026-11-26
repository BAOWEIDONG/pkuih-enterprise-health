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
@Table(name = "institution_accounts")
public class InstitutionAccountEntity {
    @Id
    private String phone;
    private String name;
    private String orgName;
    private String orgType;
    private String title;
    private String contactPhone;
    private String email;
    private String province;
    private String city;
    private Boolean active;
    private Instant createdAt;
    private Instant updatedAt;
}
