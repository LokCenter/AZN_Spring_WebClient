package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

/**
 * Overview Controller -> Calendar View
 * @version 1.05 2022-05-28
 */
@Controller
@AllArgsConstructor
// Calendar Site
@RequestMapping("/overview")
public class OverviewController {
    private final WebClient webClient;
    /**
     * Show the Calendar
     * @param model The model
     * @return Html page
     */
    @GetMapping
    String getOverviewPage(Model model,
                           @RequestParam(required = false, name = "firstday") String firstDate,
                           @RequestParam(required = false, name = "lastday") String lastDate,
                           @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                           Authentication authentication)
            throws Exception {

        // User roles
        var roles = authentication.getAuthorities();

        if (roles.isEmpty()) {
            throw new Exception("No Role");
        }

        String role = roles.toArray()[0].toString();

        String query;
        // No Query get current month
        if (firstDate == null || lastDate == null) {
            // send month as query to the backend as number e.g. month=5
            java.util.Date date= new Date();
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);

            query = String.format("month=%s&role=%s", cal.get(Calendar.MONTH), role);

        } else {
            // use default query
            query = String.format("firstday=%s&lastday=%s&role=%s", firstDate, lastDate, role);
        }

        Mono<String> res = webClient.get().uri("/overview?" + query).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        System.out.println(res.block());

        // check if there is any data
        if (res.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());

            model.addAttribute("title", "Calendar");
            model.addAttribute("data", jsonData);

            return "overview";
        }

        throw new Exception("Bad request");
    }
}
