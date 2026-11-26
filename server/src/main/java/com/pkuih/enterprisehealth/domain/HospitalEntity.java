package com.pkuih.enterprisehealth.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hospitals")
public class HospitalEntity {
    @Id
    private String id;
    private String name;
    private String shortName;
    private String province;
    private String city;
    private String region;
    private String address;
    private String phone;
    private Boolean flagship;
    private Double lat;
    private Double lng;
    private Boolean active;
}
