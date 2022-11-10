package com.lokcenter.AZN.controller;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/monthplan")
public class MonthPlanController {
    @GetMapping()
    String getMonthPlan(Model model,
                        @RegisteredOAuth2AuthorizedClient("userwebapp")
                        OAuth2AuthorizedClient authorizedClient) {
        return "monthPlan";
    }
}
