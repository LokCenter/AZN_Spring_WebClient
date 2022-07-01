package com.lokcenter.AZN.controller;

import lombok.AllArgsConstructor;

import lombok.NonNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;


/**
 * DayPlan Controller
 *
 * @version 1.02 2022-05-29
 */
@Controller
@AllArgsConstructor
@RequestMapping("/dayplan")
public class DayPlanController {
    private final WebClient webClient;

    /**
     * Show "Tagesübersicht"
     * @param model add stuff to the frond-end
     * @return Html page
     */
    @GetMapping
    String getDayPlan(Model model) {
        // Page title
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        model.addAttribute("title", formatter.format(new Date()));

        return "dayPlan";
    }

    /**
     * Post payload to backend
     * @param payload dayplan data from javascript
     * @return boolean value
     */
    @PostMapping
    @CrossOrigin("*")
    @ResponseBody
    boolean postDayPlan(@RequestBody Map<String, Object> payload,
                        @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {
        System.out.println(payload.toString());
        // post to backend
        return Boolean.TRUE.equals(this.webClient
                .post()
                .uri("/dayplan")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                // send
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(payload), payload.getClass())
                .retrieve()
                // res type
                .bodyToMono(Boolean.class)
                .block());
    }
}
