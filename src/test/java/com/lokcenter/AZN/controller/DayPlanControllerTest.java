package com.lokcenter.AZN.controller;


import lombok.RequiredArgsConstructor;
import org.junit.Before;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.htmlunit.MockMvcWebClientBuilder;
import org.springframework.test.web.servlet.htmlunit.webdriver.MockMvcHtmlUnitDriverBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

/**
 * DayPlanController Tests
 *
 * @version 1.0 - 21-07-2022
 */

@SpringBootTest
@AutoConfigureMockMvc
public class DayPlanControllerTest {
    private WebDriver driver;

    @Autowired
    private WebApplicationContext context;


    @Autowired
    private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();

        this.driver = new MockMvcHtmlUnitDriver(mockMvc, true);
    }

    @Test
    @DisplayName("Toggle between DayPlan and Calendar should work")
    @WithMockUser(roles = {"User"})
    void toggleDayPlanCalendar() {
        driver.get("http://localhost:8880/dayplan");
    }
}
