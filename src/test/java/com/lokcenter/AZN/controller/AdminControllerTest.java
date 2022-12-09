package com.lokcenter.AZN.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Client;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

    /*
     * GET admin/requests
     */

    /**
     * Admin get should work
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminRequestGetShouldWork() throws Exception {
        mvc.perform(get("/admin/requests?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("junit")));
    }

    /**
     * Admin requests should not work as user
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void adminRequestGetShouldNotWorkAsUser() throws Exception {
        mvc.perform(get("/admin/requests?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin get requests should not work without userid
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetRequestsShouldNotWorkWithoutUserid() throws Exception {
        mvc.perform(get("/admin/requests")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isBadRequest());
    }

    /**
     * Admin Get requests should not work with wrong origin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetRequestShouldNotWorkWithWrongOrigin() throws Exception {
        mvc.perform(get("/admin/requests?userId=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/test")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /*
     * GET admin/requests/delete
     */

    /**
     * Admin should delete request
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminShouldDeleteRequest() throws Exception {
        mvc.perform(
                put("/admin/requests/delete?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                        .header("Access-Control-Request-Method", "PUT")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isOk());
    }

    /**
     * user should not be allowed to delete a request
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void userShouldNotDeleteRequest() throws Exception {
        mvc.perform(
                        put("/admin/requests/delete?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * User without role should not be allowed to delete any requests
     */
    @Test
    @WithMockUser()
    public void userWithoutRoleShouldNotDeleteRequest() throws Exception {
        mvc.perform(
                        put("/admin/requests/delete?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * Put request without csrf should not be allowed
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void requestsDeleteWithoutCsrfShouldNotBeAllowed() throws Exception {
        mvc.perform(
                        put("/admin/requests/delete?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Put request delete should not be allowed with wrong origin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void requestsDeleteShouldNotBeAllowedWithWrongOrigin() throws Exception {
        mvc.perform(
                        put("/admin/requests/delete?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/sdf")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /*
     * GET admin/requests/accept
     */

    /**
     * Admin should accept request
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminShouldAcceptRequest() throws Exception {
        mvc.perform(
                        put("/admin/requests/accept?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isOk());
    }

    /**
     * user should not be allowed to accept a request
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void userShouldNotAcceptRequest() throws Exception {
        mvc.perform(
                        put("/admin/requests/accept?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * User without role should not be allowed to delete any requests
     */
    @Test
    @WithMockUser()
    public void userWithoutRoleShouldNotAcceptRequest() throws Exception {
        mvc.perform(
                        put("/admin/requests/accept?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /**
     * Put request without csrf should not be allowed
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void requestsAcceptWithoutCsrfShouldNotBeAllowed() throws Exception {
        mvc.perform(
                        put("/admin/requests/accept?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/admin")
                                .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Put request accept should not be allowed with wrong origin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void requestsAcceptShouldNotBeAllowedWithWrongOrigin() throws Exception {
        mvc.perform(
                        put("/admin/requests/accept?startDate=01-12-2022&endDate=01-12-2022&userid=23")
                                .header("Access-Control-Request-Method", "PUT")
                                .header("Origin", "/sdf")
                                .with(oauth2Client("userwebapp")).with(csrf()))
                .andExpect(status().isForbidden());
    }

    /*
     * GET admin/monthplan
     */

    /**
     * Admin Get monthplan
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminShouldGetMonthplan() throws Exception {
        mvc.perform(get("/admin/monthplan?userid=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isOk());
    }

    /**
     * user should not be allowed to access monthplan
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void userShouldNotBeAllowToAccessAdminMonthPlan() throws Exception {
        mvc.perform(get("/admin/monthplan?userid=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * monthplan request should not work without userid
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminMonthPlanShouldNotWorkWithoutUserId() throws Exception {
        mvc.perform(get("/admin/monthplan")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isBadRequest());
    }

    /**
     * Admin Monthplan request should not work with wrong origin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminMonthplanShouldNotWorkWithWrongOrigin() throws Exception {
        mvc.perform(get("/admin/monthplan?userid=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/df")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /*
     * GET admin/dayplan
     */

    /**
     * Admin get dayplan should work
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetDayPlanShouldWork() throws Exception {
        mvc.perform(get("/admin/dayplan?userid=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isOk());
    }

    /**
     * Admin get dayplan should not work as user
     */
    @Test
    @WithMockUser(roles = {"User"})
    public void adminGetDayPlanShouldNotAsUser() throws Exception {
        mvc.perform(get("/admin/dayplan?userid=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin Get should not work with wrong origin
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetDayPlanShouldNotWorkWithWrongOrigin() throws Exception {
        mvc.perform(get("/admin/dayplan?userid=4")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/df")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isForbidden());
    }

    /**
     * Admin get dayplan should not work without userid
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void adminGetDayPlanShouldNotWorkWithoutUserid() throws Exception {
        mvc.perform(get("/admin/dayplan")
                        .header("Access-Control-Request-Method", "GET")
                        .header("Origin", "/admin")
                        .with(oauth2Client("userwebapp")))
                .andExpect(status().isBadRequest());
    }
}