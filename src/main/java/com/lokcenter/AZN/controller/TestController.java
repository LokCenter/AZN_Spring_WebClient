package com.lokcenter.AZN.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
public class TestController {
    private final WebClient webClient;

    public TestController(WebClient webClient) {
        this.webClient = webClient;
    }

    @CrossOrigin("*")
    @PostMapping("/response")
    @ResponseBody
    Boolean responseRest(@RequestBody Map<String, Object> payload, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {

        // Post
        return this.webClient
                .post()
                .uri("/hello")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                // send
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(payload), payload.getClass())
                .retrieve()
                // res type
                .bodyToMono(Boolean.class)
                .block();

    }
    
}
