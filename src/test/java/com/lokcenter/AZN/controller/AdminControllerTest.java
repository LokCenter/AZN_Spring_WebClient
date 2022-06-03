package com.lokcenter.AZN.controller;



import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTest {
    @Autowired
    private MockMvc mockMvc;


    @WithMockUser(username = "Huscher", password = "Saubartl", roles = "ADMIN")
    @Test
    void getAdminPanel_should_allow_admin() throws Exception {
        // should get 200
        mockMvc.perform(get("/admin")).andExpect(status().isOk());
    }

    @WithMockUser(username = "gstopft", password = "Jause", roles = "USER")
    @Test
    void getAdminPanel_should_not_allow_user() throws Exception {
        // should get 403
        mockMvc.perform(get("/admin")).andExpect(status().isForbidden());
    }
}