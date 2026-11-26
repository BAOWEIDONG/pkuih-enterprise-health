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
@Table(name = "appointments")
public class AppointmentEntity {
    @Id
    private String id;
    @Column(unique = true)
    private String idempotencyKey;
    private String ownerPhone;
    private String hospitalId;
    private String serviceType;
    private String doctorId;
    private String doctorName;
    private String tier;
    private LocalDate date;
    private String province;
    private String city;
    private String address;
    private String venue;
    private String topic;
    private String audience;
    private Integer headcount;
    @Lob
    private String note;
    private String status;
    @Lob
    private String planJson;
    @Lob
    private String assignedStaffJson;
    @Lob
    private String internalNote;
    @Lob
    private String feedback;
    private String demandId;
    private Boolean manualArrangement;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant acceptedAt;
    private Instant planSentAt;
    private Instant confirmedAt;
    private Instant cancelledAt;
    private Instant completedAt;
    private Instant locationUpdatedAt;
}
