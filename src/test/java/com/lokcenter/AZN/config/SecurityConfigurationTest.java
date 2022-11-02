package com.lokcenter.AZN.config;

import lombok.With;
import org.junit.Before;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.matchers.JUnitMatchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
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

    @Before
    public void setup() {
    }

    /************************
     /dayplan
     ************************/

    /**
     * User without role should not be allowed to access /dayplan
     */
    @Test
    @WithMockUser()
    public void getDayplanWithoutRole() throws Exception {
        mvc.perform(get("/dayplan").with(oauth2Client("userwebapp"))).andExpect(status().isForbidden());
    }

    /**
     * user with role ROLE_User should be allowed to access /dayplan

     */
    @Test
    @WithMockUser(roles = {"User"})
    public void getDayplanWithUserShouldWork() throws Exception {
        mvc.perform(get("/dayplan").with(oauth2Client("userwebapp"))).andExpect(status().isOk());
    }

    /**
     * User with role ROLE_Admin should not be allowed to access /dayplan
     */
    @Test
    @WithMockUser(roles = {"Admin"})
    public void getDayPlanWithAdminShouldNotWork() throws Exception {
        mvc.perform(get("/dayplan").with(oauth2Client("userwebapp"))).andExpect(status().isForbidden());
    }
}
