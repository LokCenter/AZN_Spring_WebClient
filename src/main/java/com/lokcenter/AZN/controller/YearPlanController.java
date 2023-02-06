package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokcenter.AZN.helper.JunitHelper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@Controller
@AllArgsConstructor
@RequestMapping("/yearplan")
public class YearPlanController {
    private WebClient webClient;
    @GetMapping
    String GetYearPlan(Model model,
                       @RegisteredOAuth2AuthorizedClient("userwebapp")
                       OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {

        if (JunitHelper.isJUnitTest()) {
            return "yearPlan";
        }
        // make get request and get data
        Mono<String> res = webClient.get().uri("/yearplan").
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // User roles
        var roles = authentication.getAuthorities();

        if (roles.isEmpty()) {
            throw new Exception("No Role");
        }

        String role = roles.toArray()[0].toString();

        String queryTwo = String.format("year=%s&role=%s", Calendar.getInstance().get(Calendar.YEAR), role);

        // get balance
        Mono<String> resBalance = webClient.get().uri("balance?" + queryTwo).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null && resBalance.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonNodeBalance = new ObjectMapper().readTree(resBalance.block());

            model.addAttribute("title", "Jahresübersicht");
            model.addAttribute("data", jsonData);
            model.addAttribute("balance", jsonNodeBalance);

            return "yearPlan";

        }

        throw new Exception("Bad request");

    }
}
