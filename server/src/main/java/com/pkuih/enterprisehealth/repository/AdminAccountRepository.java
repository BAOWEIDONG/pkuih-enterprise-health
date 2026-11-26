package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.AdminAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminAccountRepository extends JpaRepository<AdminAccountEntity, String> {
    List<AdminAccountEntity> findAllByOrderByRoleAscNameAsc();
}
