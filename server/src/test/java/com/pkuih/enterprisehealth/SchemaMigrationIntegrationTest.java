package com.pkuih.enterprisehealth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("migration-test")
class SchemaMigrationIntegrationTest {
    @Autowired
    private JdbcTemplate jdbc;

    @Test
    void flywayMigrationsMatchEntitySchema() {
        Integer applied = jdbc.queryForObject(
            "select count(*) from flyway_schema_history where success = true",
            Integer.class
        );
        assertThat(applied).isGreaterThanOrEqualTo(2);
    }
}
