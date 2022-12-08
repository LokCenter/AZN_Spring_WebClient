package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Client;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * DayPlanController
 * @version 1.0 - 02-11-2022
 */
@SpringBootTest
@AutoConfigureMockMvc
class DayPlanControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext wac;

    @Before
    public void setup() {
    }

    /**
     * Post should only work with an valid CSRF Token
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void shouldPostWithValidCSRFToken() throws Exception {
        Map<String, Object> data = new HashMap<>();

        data.put("test", "test");

        mvc.perform(post("/dayplan")
                .contentType(APPLICATION_JSON_UTF8)
                .content(new ObjectMapper().writeValueAsString(data))
                .header("Access-Control-Request-Method", "POST")
                .header("Origin", "/dayplan")
                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isOk());
    }

    /**
     * Post should not work without CSRF Token
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void shouldNotPostWithInvalidCSRFToken() throws Exception {
        Map<String, Object> data = new HashMap<>();

        data.put("test", "test");

        mvc.perform(post("/dayplan")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(new ObjectMapper().writeValueAsString(data))
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Should not post without any data
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void shouldNotPostWithoutData() throws Exception {
        mvc.perform(post("/dayplan")
                        .header("Access-Control-Request-Method", "POST")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isBadRequest());
    }

    /**
     * Should not post with admin role
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void shouldNotPostWithAdminRole() throws Exception {
        Map<String, Object> data = new HashMap<>();

        data.put("test", "test");

        mvc.perform(post("/dayplan")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(new ObjectMapper().writeValueAsString(data))
                        .header("Access-Control-Request-Method", "POST")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * should not post without valid role and without role
     */
    @Test
    @WithMockUser()
    public void shouldNotPostWithoutRole() throws Exception {
        Map<String, Object> data = new HashMap<>();

        data.put("test", "test");

        mvc.perform(post("/dayplan")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(new ObjectMapper().writeValueAsString(data))
                        .header("Access-Control-Request-Method", "POST")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * Should not post with wrong origin
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void shouldNotPostWithInvalidOrigin() throws Exception {
        Map<String, Object> data = new HashMap<>();

        data.put("test", "test");

        mvc.perform(post("/dayplan")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(new ObjectMapper().writeValueAsString(data))
                        .header("Access-Control-Request-Method", "POST")
                        .header("Origin", "/some")
                        .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * User should get /dayplan
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void userShouldGetDayplan() throws Exception {
        mvc.perform(get("/dayplan")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isOk());
    }

    /**
     * Admin should not get /dayplan
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminShouldNotGetDayplan() throws Exception {
        mvc.perform(get("/dayplan")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Should not get dayplan without role
     */
    @Test
    @WithMockUser()
    public void shouldNotGetDayPlanWithoutRole() throws Exception {
        mvc.perform(get("/dayplan")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/dayplan")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Should not get dayplan with wrong Origin
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void userShouldNotGetDayplanWithWrongOrigin() throws Exception {
        mvc.perform(get("/dayplan")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/something")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }
}