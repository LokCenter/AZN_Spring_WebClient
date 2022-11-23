package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lokcenter.AZN.helper.ControllerHelper;
import com.lokcenter.AZN.helper.JunitHelper;
import lombok.AllArgsConstructor;

import lombok.NonNull;
import mjson.Json;
import net.minidev.json.writer.JsonReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.io.StringReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

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
    String getDayPlan(Model model, @RequestParam(name = "date", required = false) String date,
                      @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                      Authentication authentication) throws Exception {
        if (JunitHelper.isJUnitTest()) {
            return "dayPlan";
        } else {
            Optional<Date> requestedDate = Optional.empty();
            DateFormat df = new SimpleDateFormat("dd-MM-yyyy");

            if (date != null) {
                try {
                    requestedDate = Optional.of(df.parse(date));
                } catch (ParseException ignore) {
                    throw new Exception("Bad Request");
                }
            }

            String dateString = df.format(requestedDate.orElse(Calendar.getInstance().getTime()));


            // User roles
           String role = ControllerHelper.getUserOrAdminRole(authentication);


            // make get request and get data
            Mono<String> res = webClient.get().uri(String.format("/dayplan?date=%s&role=%s", dateString, role)).
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                JsonNode jsonData = new ObjectMapper().readTree(res.block());

                // Page title
                SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

                model.addAttribute("title", formatter.format(new Date()));
                model.addAttribute("data", jsonData);

                return "dayPlan";
            }

            throw new Exception("Bad request");
        }
    }

    /**
     * Post payload to backend
     * @param payload dayplan data from javascript
     * @return boolean value
     */
    @PostMapping
    @CrossOrigin("/dayplan")
    @ResponseBody
    boolean postDayPlan(@RequestBody Map<String, Object> payload,
                        @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {
        System.out.println(payload.toString());

        // junit can't push data to the resource server
        if (JunitHelper.isJUnitTest()) {
            return true;
        }
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
