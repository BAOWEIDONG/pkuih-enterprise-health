package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.ExpertEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpertRepository extends JpaRepository<ExpertEntity, String> {
    List<ExpertEntity> findByActiveTrueOrderByTierAscNameAsc();

    List<ExpertEntity> findByHospitalIdAndActiveTrueOrderByTierAscNameAsc(String hospitalId);
}
