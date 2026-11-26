package com.pkuih.enterprisehealth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pkuih.enterprisehealth.repository.AppointmentRepository;
import com.pkuih.enterprisehealth.repository.SlotRepository;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CoreFlowIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private SlotRepository slots;

    @Autowired
    private AppointmentRepository appointments;

    @Test
    void institutionCanBookAndHospitalCanDeliverConfirmedPlan() throws Exception {
        HttpSession institution = institutionSession();
        LocalDate date = slots.findByDoctorIdAndDateBetweenOrderByDateAsc(
            "director-02",
            LocalDate.now(),
            LocalDate.now().plusDays(90)
        ).getFirst().getDate();

        MvcResult created = mvc.perform(post("/api/v1/appointments")
                .session((org.springframework.mock.web.MockHttpSession) institution)
                .with(csrf())
                .header("Idempotency-Key", "integration-booking-1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.ofEntries(
                    Map.entry("serviceType", "讲座"),
                    Map.entry("doctorId", "director-02"),
                    Map.entry("date", date.toString()),
                    Map.entry("province", "北京市"),
                    Map.entry("city", "北京市"),
                    Map.entry("address", "北京市朝阳区测试路1号"),
                    Map.entry("venue", "会议厅"),
                    Map.entry("topic", "企业健康讲座"),
                    Map.entry("audience", "企业员工"),
                    Map.entry("headcount", 60),
                    Map.entry("note", "集成测试")
                ))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("pending"))
            .andReturn();
        String appointmentId = json(created).path("data").path("id").asText();
        assertThat(appointments.findById(appointmentId)).isPresent();

        HttpSession operator = adminSession("pkuih", "pkuih2026");
        mvc.perform(post("/api/v1/appointments/{id}/accept", appointmentId)
                .session((org.springframework.mock.web.MockHttpSession) operator)
                .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("planning"))
            .andExpect(jsonPath("$.data.assignedStaff.name").value("周老师"))
            .andExpect(jsonPath("$.data.assignedStaff.phone").value("13800001111"));

        mvc.perform(put("/api/v1/appointments/{id}/plan", appointmentId)
                .session((org.springframework.mock.web.MockHttpSession) operator)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                    "topic", "企业健康讲座",
                    "outline", "常见慢病预防",
                    "agenda", "签到-讲座-问答",
                    "team", "周老师",
                    "contactPhone", "13800001111"
                ))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("review"))
            .andExpect(jsonPath("$.data.plan.agenda").value("签到-讲座-问答"));

        mvc.perform(post("/api/v1/appointments/{id}/confirm", appointmentId)
                .session((org.springframework.mock.web.MockHttpSession) institution)
                .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("confirmed"));

        mvc.perform(put("/api/v1/slots/batch")
                .session((org.springframework.mock.web.MockHttpSession) operator)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                    "doctorIds", new String[]{"director-02"},
                    "from", date.toString(),
                    "to", date.toString(),
                    "weekdays", new int[]{date.getDayOfWeek().getValue()},
                    "capacity", 0
                ))))
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$.code").value("SLOT_CAPACITY_BELOW_BOOKED"));
    }

    @Test
    void groupDemandIsVisibleOnlyToSuperadminAndCanBecomeAppointment() throws Exception {
        HttpSession institution = institutionSession();
        MvcResult demandResult = mvc.perform(post("/api/v1/demands")
                .session((org.springframework.mock.web.MockHttpSession) institution)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                    "targetType", "group",
                    "serviceType", "健康咨询",
                    "topic", "员工健康咨询专场",
                    "audience", "一线员工",
                    "headcount", 80,
                    "preferredDate", LocalDate.now().plusDays(45).toString(),
                    "province", "北京市",
                    "city", "北京市",
                    "note", "希望安排全科专家"
                ))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("pending"))
            .andReturn();
        String demandId = json(demandResult).path("data").path("id").asText();

        HttpSession operator = adminSession("pkuih", "pkuih2026");
        mvc.perform(post("/api/v1/demands/{id}/contact", demandId)
                .session((org.springframework.mock.web.MockHttpSession) operator)
                .with(csrf()))
            .andExpect(status().isForbidden());

        HttpSession superadmin = adminSession("admin", "pkuih2026");
        mvc.perform(post("/api/v1/demands/{id}/contact", demandId)
                .session((org.springframework.mock.web.MockHttpSession) superadmin)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"note\":\"已电话沟通\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("contacted"));

        LocalDate matchedDate = LocalDate.now().plusDays(46);
        mvc.perform(post("/api/v1/demands/{id}/match", demandId)
                .session((org.springframework.mock.web.MockHttpSession) superadmin)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                    "doctorId", "director-02",
                    "date", matchedDate.toString(),
                    "note", "已为机构预留"
                ))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.status").value("matched"))
            .andExpect(jsonPath("$.data.matchedDate").value(matchedDate.toString()));

        mvc.perform(post("/api/v1/appointments")
                .session((org.springframework.mock.web.MockHttpSession) institution)
                .with(csrf())
                .header("Idempotency-Key", "integration-demand-conversion")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.ofEntries(
                    Map.entry("serviceType", "健康咨询"),
                    Map.entry("doctorId", "director-02"),
                    Map.entry("date", matchedDate.toString()),
                    Map.entry("province", "北京市"),
                    Map.entry("city", "北京市"),
                    Map.entry("address", "北京市海淀区测试路2号"),
                    Map.entry("venue", "健康中心"),
                    Map.entry("topic", "员工健康咨询专场"),
                    Map.entry("audience", "一线员工"),
                    Map.entry("headcount", 80),
                    Map.entry("demandId", demandId)
                ))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.demandId").value(demandId))
            .andExpect(jsonPath("$.data.manualArrangement").value(true));
    }

    private HttpSession institutionSession() throws Exception {
        MvcResult result = mvc.perform(post("/api/v1/auth/institution/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"phone\":\"13800000001\",\"code\":\"888888\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.role").value("INSTITUTION"))
            .andReturn();
        return result.getRequest().getSession(false);
    }

    private HttpSession adminSession(String username, String password) throws Exception {
        MvcResult result = mvc.perform(post("/api/v1/auth/admin/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                    "username", username,
                    "password", password
                ))))
            .andExpect(status().isOk())
            .andReturn();
        return result.getRequest().getSession(false);
    }

    private JsonNode json(MvcResult result) throws Exception {
        return objectMapper.readTree(result.getResponse().getContentAsByteArray());
    }
}
