package com.lokcenter.AZN.controller;


import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class DayPlanControllerTest {
    @Autowired
    private MockMvc mockMvc;


    @WithMockUser(username = "Huscher", password = "Saubartl", roles = "ADMIN")
    @Test
    void getDayPlan_should_allow_admin() throws Exception {
        // should get 200
        mockMvc.perform(get("/overview")).andExpect(status().isOk());
    }

    @WithMockUser(username = "gstopft", password = "Jause", roles = "USER")
    @Test
    void getDayPlan_should_allow_user() throws Exception {
        // should get 200
        mockMvc.perform(get("/overview")).andExpect(status().isOk());
    }
}