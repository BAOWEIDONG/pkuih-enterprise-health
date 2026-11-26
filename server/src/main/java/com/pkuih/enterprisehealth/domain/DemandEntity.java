package com.pkuih.enterprisehealth.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "demands")
public class DemandEntity {
    @Id
    private String id;
    private String ownerPhone;
    private String targetType;
    private String hospitalId;
    private String serviceType;
    @Lob
    private String topic;
    @Lob
    private String audience;
    private Integer headcount;
    private LocalDate preferredDate;
    private String province;
    private String city;
    private String status;
    @Lob
    private String note;
    private String matchedExpertId;
    private String matchedExpertName;
    private String matchedHospitalId;
    private LocalDate matchedDate;
    private Instant matchedAt;
    @Lob
    private String matchNote;
    private String convertedAppointmentId;
    private Instant convertedAt;
    @Column(length = 2000)
    private String assignedStaffJson;
    private Instant createdAt;
    private Instant updatedAt;
}
