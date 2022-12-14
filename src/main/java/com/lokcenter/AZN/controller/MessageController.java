package com.lokcenter.AZN.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
@AllArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final WebClient webClient;
    @ResponseBody
    @PutMapping("/true")
    Boolean messageWasRead(@RequestParam(name = "messageId", required = true) String messageId, @RegisteredOAuth2AuthorizedClient("userwebapp")
    OAuth2AuthorizedClient authorizedClient) {
        return Boolean.TRUE.equals(this.webClient
                .put()
                .uri("/message/true?messageId="+messageId)
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                // res type
                .bodyToMono(Boolean.class)
                .block());
    }
}
