package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokcenter.AZN.helper.JunitHelper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

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
                           @RequestParam(required = false, name = "month") String month,
                           @RequestParam(required = false, name = "year") String year,
                           @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                           Authentication authentication)
            throws Exception {

        if (JunitHelper.isJUnitTest()) {
            return "overview";
        }

        // check if there are any queries empty
        if (firstDate == null || lastDate == null || month == null || year == null) {

            return "overview";
        }

        // show calendar stats

        // User roles
        var roles = authentication.getAuthorities();

        if (roles.isEmpty()) {
            throw new Exception("No Role");
        }

        String role = roles.toArray()[0].toString();

        String query =String.format("firstday=%s&lastday=%s&month=%s&year=%s&role=%s", firstDate, lastDate,month, year, role);
        String query2 = String.format("firstday=%s&lastday=%s&month=%s&year=%s", firstDate, lastDate, month, year);

        Mono<String> res = webClient.get().uri("/overview?" + query).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        Mono<String> res2 = webClient.get().uri("/overview/dayt?" + query2).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        String queryTwo = String.format("year=%s&role=%s", year, role);

        Mono<String> resStats = webClient.get().uri("/overview/stats?" + queryTwo).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        Mono<String> resBalance = webClient.get().uri("balance?" + queryTwo).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null && res2.block() != null && res2.block() != null && resBalance.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonDayDate = new ObjectMapper().readTree(res2.block());
            JsonNode jsonStats = new ObjectMapper().readTree(resStats.block());
            JsonNode jsonBalance = new ObjectMapper().readTree(resBalance.block());

            model.addAttribute("title", "Calendar");
            model.addAttribute("data", jsonData);
            model.addAttribute("daydata", jsonDayDate);
            model.addAttribute("stats", jsonStats);
            model.addAttribute("balance", jsonBalance);

            return "overview";
        }

        throw new Exception("Bad request");
    }

    @PostMapping
    @ResponseBody
    @CrossOrigin("http://localhost:8880/overview")
    Boolean getPostMapping(@RequestBody Map<String, Object> payload,
                           @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {


        return Boolean.TRUE.equals(this.webClient
                .post()
                .uri("/overview")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(payload), payload.getClass())
                .retrieve()
                // res type
                .bodyToMono(Boolean.class)
                .block());
    }
}
