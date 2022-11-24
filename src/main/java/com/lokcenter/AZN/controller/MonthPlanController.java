package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokcenter.AZN.helper.ControllerHelper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.ContentHandler;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@Controller
@AllArgsConstructor
@RequestMapping("/monthplan")
public class MonthPlanController {
    private final WebClient webClient;
    @GetMapping()
    String getMonthPlan(Model model,
                        @RequestParam(name = "month", required = false) String month,
                        @RequestParam(name = "year", required = false) String year,
                        @RegisteredOAuth2AuthorizedClient("userwebapp")
                        OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {

        // generate date if no date
        if (year == null || month == null) {
            LocalDate currDate = LocalDate.now();

            month = String.valueOf(currDate.getMonthValue());
            year = String.valueOf(currDate.getYear());
        }

        month = String.valueOf(Integer.parseInt(month)+1);

        String role = ControllerHelper.getUserOrAdminRole(authentication);

        // make get request and get data
        Mono<String> res = webClient.get().uri(String.format("/monthplan?month=%s&year=%s&role=%s", month, year, role)).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());

            model.addAttribute("data", jsonData);

            return "monthPlan";
        }

        throw new Exception("Bad request");
    }
}
