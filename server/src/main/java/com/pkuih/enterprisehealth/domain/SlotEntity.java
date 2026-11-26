package com.pkuih.enterprisehealth.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "slots",
    uniqueConstraints = @UniqueConstraint(name = "uk_slot_doctor_date", columnNames = {"doctor_id", "slot_date"})
)
public class SlotEntity {
    @Id
    private String id;
    @Column(name = "doctor_id", nullable = false)
    private String doctorId;
    @Column(name = "slot_date", nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private Integer capacity;
    @Version
    private Long version;
}
