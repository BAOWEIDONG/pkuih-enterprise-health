package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.DemandEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DemandRepository extends JpaRepository<DemandEntity, String> {
    List<DemandEntity> findAllByOrderByCreatedAtDesc();

    List<DemandEntity> findByOwnerPhoneOrderByCreatedAtDesc(String ownerPhone);

    List<DemandEntity> findByHospitalIdOrderByCreatedAtDesc(String hospitalId);

    List<DemandEntity> findByStatusAndMatchedExpertIdAndMatchedDate(String status, String expertId, LocalDate date);

    List<DemandEntity> findByStatusAndMatchedExpertId(String status, String expertId);
}
