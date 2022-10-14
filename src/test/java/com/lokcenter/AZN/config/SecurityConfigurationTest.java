package com.lokcenter.AZN.config;

import lombok.With;
import org.junit.Before;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.matchers.JUnitMatchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Access Control Tests
 *
 * @version 1.01 - 02-07-2022
 */
@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigurationTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private FilterChainProxy springSecurityFilterChain;

    @Before
    public void setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac)
                .addFilter(springSecurityFilterChain).build();
    }

    // /overview (GET)
    @Test
    @DisplayName("/overview (get) - User should get 403 without role")
    @WithMockUser
    void overview_get_without_role() throws Exception {
        mvc.perform(get("/overview")).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("/overview (get) - User should get 200 with User role")
    @WithMockUser(roles = {"User"})
    void overview_get_with_user_role() throws Exception {
        mvc.perform(get("/overview")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("/overview (get) - User should get 403 with admin role")
    @WithMockUser(roles = {"Admin"})
    void overview_get_with_admin_role() throws Exception {
        mvc.perform(get("/overview")).andExpect(status().isForbidden());
    }

    // /admin/** (get)
    @Test
    @DisplayName("/admin (get) - User should get 403 without role")
    @WithMockUser()
    void admin_get_without_role() throws Exception {
        mvc.perform(get("/admin")).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("/admin (get) - User should get 403 with user  role")
    @WithMockUser(roles = {"User"})
    void admin_get_with_user_role() throws Exception {
        mvc.perform(get("/admin")).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("/admin (get) - User should get 403 with user  role")
    @WithMockUser(roles = {"Admin"})
    void admin_get_with_role() throws Exception {
        mvc.perform(get("/admin")).andExpect(status().isOk());
    }
}
