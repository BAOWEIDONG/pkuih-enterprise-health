package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, String> {
    List<AppointmentEntity> findAllByOrderByCreatedAtDesc();

    List<AppointmentEntity> findByOwnerPhoneOrderByCreatedAtDesc(String ownerPhone);

    List<AppointmentEntity> findByHospitalIdOrderByCreatedAtDesc(String hospitalId);

    List<AppointmentEntity> findByDoctorIdAndDateAndStatusNot(String doctorId, LocalDate date, String status);

    List<AppointmentEntity> findByDoctorIdAndDateBetweenAndStatusNot(
        String doctorId,
        LocalDate from,
        LocalDate to,
        String status
    );

    long countByDoctorIdAndDateAndStatusNot(String doctorId, LocalDate date, String status);

    Optional<AppointmentEntity> findByIdempotencyKey(String idempotencyKey);

    Optional<AppointmentEntity> findFirstByDemandId(String demandId);
}
