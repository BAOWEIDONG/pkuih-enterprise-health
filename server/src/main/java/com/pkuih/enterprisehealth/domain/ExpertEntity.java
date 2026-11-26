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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experts")
public class ExpertEntity {
    @Id
    private String id;
    @Column(name = "display_no")
    private String no;
    private String name;
    private String tier;
    private String hospitalId;
    private String hospital;
    private String dept;
    private String deptTitle;
    @Lob
    private String servicesJson;
    private String coverage;
    @Lob
    private String coverageCitiesJson;
    @Lob
    private String coverageRegionsJson;
    @Lob
    private String specialty;
    @Lob
    private String intro;
    private Integer leadDays;
    private String leadLabel;
    private String gender;
    private String photo;
    private String photoCard;
    private String photoDetail;
    private String profileUrl;
    private Boolean active;
    private String region;
}
