package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.InstitutionAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstitutionAccountRepository extends JpaRepository<InstitutionAccountEntity, String> {
    List<InstitutionAccountEntity> findAllByOrderByCreatedAtDesc();
}
