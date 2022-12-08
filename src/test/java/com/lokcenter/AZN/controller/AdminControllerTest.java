package com.lokcenter.AZN.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Client;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * AdminControllerTest
 *
 * @version 1.1 2022-12-08
 */
@SpringBootTest
@AutoConfigureMockMvc
public class AdminControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext wac;

    /*
     * GET /Admin
     */

    /**
     * Admin Get should be allowed for admin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetShouldWorkAsAdmin() throws Exception {
        mvc.perform(get("/admin")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isOk());
    }


    /**
     * Admin Get should not work as user
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void adminGetShouldNotWorkAsUser() throws Exception {
        mvc.perform(get("/admin")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin get should not work without admin role
     */
    @Test
    @WithMockUser()
    public void adminGetShouldNotWorkWithoutRole() throws Exception {
        mvc.perform(get("/admin")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin get should not work with wrong origin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetShouldNotWorkWithWrongOrigin() throws Exception {
        mvc.perform(get("/admin")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/other")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /*
     * GET admin/yearplan
     */

    /**
     * Admin get yearplan as admin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void yearplanAsAdminShouldWork() throws Exception {
        mvc.perform(get("/admin/yearplan?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("junit")));
    }

    /**
     * Admin get yearplan should not work as user
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void yearplanAsUserShouldNotWork() throws Exception {
        mvc.perform(get("/admin/yearplan?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin get yearplan should not work without role
     */
    @Test
    @WithMockUser()
    public void yearplanWithoutRoleShouldNotWork() throws Exception {
        mvc.perform(get("/admin/yearplan?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin get yearplan should not work with wrong orgin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void yearPlanWithWrongOriginShouldNotWork() throws Exception {
        mvc.perform(get("/admin/yearplan?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/some")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }
}
