package com.lokcenter.AZN.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * ErrorControllerTest
 * @version 1.1 2022-12-08
 */
@SpringBootTest
@AutoConfigureMockMvc
public class ErrorControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext wac;

    /**
     * Should redirect without authentication
     * @throws Exception
     */
    @Test
    public void userShouldNotGetDayplanWithWrongOrigin() throws Exception {
        mvc.perform(get("/error")).andExpect(status().is3xxRedirection());
    }
}