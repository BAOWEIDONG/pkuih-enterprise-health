package com.pkuih.enterprisehealth.repository;

import com.pkuih.enterprisehealth.domain.SlotEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<SlotEntity, String> {
    List<SlotEntity> findByDoctorIdAndDateBetweenOrderByDateAsc(String doctorId, LocalDate from, LocalDate to);

    Optional<SlotEntity> findByDoctorIdAndDate(String doctorId, LocalDate date);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select s from SlotEntity s where s.doctorId = :doctorId and s.date = :date")
    Optional<SlotEntity> findForUpdate(@Param("doctorId") String doctorId, @Param("date") LocalDate date);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        select s from SlotEntity s
        where s.doctorId = :doctorId and s.date between :from and :to
        order by s.date
        """)
    List<SlotEntity> findRangeForUpdate(
        @Param("doctorId") String doctorId,
        @Param("from") LocalDate from,
        @Param("to") LocalDate to
    );
}
