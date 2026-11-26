package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.HospitalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HospitalRepository extends JpaRepository<HospitalEntity, String> {
    List<HospitalEntity> findByActiveTrueOrderByNameAsc();
}
