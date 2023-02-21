package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokcenter.AZN.helper.ControllerHelper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Map;

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
        } else {
            month = String.valueOf(Integer.parseInt(month) + 1);
        }

        String role = ControllerHelper.getUserOrAdminRole(authentication);

        // make get request and get data
        Mono<String> res = webClient.get().uri(String.format("/monthplan?month=%s&year=%s&role=%s", month, year, role)).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        Mono<String> resStatus = webClient.method(HttpMethod.GET).uri("monthplan/status").
                attributes(oauth2AuthorizedClient(authorizedClient))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(Map.of("month", month, "year", year)), Map.class)
                .retrieve().bodyToMono(String.class);

        // get soll time
        Mono<String> resSoll = webClient.get().uri(String.format("/worktime/sollMonth?role=%s&month=%s&year=%s",
                        role, month, year)).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null && resStatus.block() != null && resSoll.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonDataStatus = new ObjectMapper().readTree(resStatus.block());
            JsonNode jsonSoll = new ObjectMapper().readTree(resSoll.block());

            model.addAttribute("data", jsonData);
            model.addAttribute("status", jsonDataStatus);
            model.addAttribute("title", "Monatsübersicht");
            model.addAttribute("dataSoll", jsonSoll);

            return "monthPlan";
        }

        throw new Exception("Bad request");
    }

    /**
     * Submit Monthplan
     */
    @ResponseBody
    @PutMapping("/submit")
    Boolean SubmitMonthPlan(@RequestBody Map<String, Object> payload, @RegisteredOAuth2AuthorizedClient("userwebapp")
    OAuth2AuthorizedClient authorizedClient) {
        return Boolean.TRUE.equals(this.webClient
                .put()
                .uri("/monthplan/submit")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                // send
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(payload), Map.class)
                .retrieve()
                // res type
                .bodyToMono(Boolean.class)
                .block());
    }


    @ResponseBody
    @GetMapping("/message")
    String getMessage(@RequestParam(name = "month", required = true) String month,
                       @RequestParam(name = "year", required = true) String year,
                       @RequestParam(name = "type", required = true) String type,
                      @RegisteredOAuth2AuthorizedClient("userwebapp")
                      OAuth2AuthorizedClient authorizedClient ) throws JsonProcessingException {

        Mono<String> res = webClient.method(HttpMethod.GET).uri("/monthplan/message").
                attributes(oauth2AuthorizedClient(authorizedClient))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(Map.of("year", year, "month", month, "type", type)), Map.class)
                .retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null) {
            return new ObjectMapper().readTree(res.block()).toPrettyString();
        }

        return "";
    }
}
