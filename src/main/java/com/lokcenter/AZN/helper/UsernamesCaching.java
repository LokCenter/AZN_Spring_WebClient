package com.lokcenter.AZN.helper;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;


@Service
public class UsernamesCaching {
    
    private String cacheddata;
    private Instant lastFetched;

    private String cachedName;
    private Instant lastFetchedName;

    @Autowired
    private WebClient webClient;

    public String showUserNameList( @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {

        if(cacheddata != null && lastFetched != null && Instant.now().minusSeconds(60).isBefore(lastFetched)) {
            return cacheddata;
        }

        Mono<String> res = webClient.get().uri("admin/userlist").
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class).doOnNext(data -> {
                    this.cacheddata = data;
                    this.lastFetched = Instant.now();
                });


        if (res.block() != null) {
            return res.block();
        }

        return "";
    }

    public String getUsernameFromID( @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient, Authentication authentication,
    @RequestParam(name = "user_id") Long userid) {

        if(cachedName != null && lastFetchedName != null && Instant.now().minusSeconds(60).isBefore(lastFetchedName)) {
            return cachedName;
        }

        Mono<String> res = webClient.get().uri("/admin/usernamefromid?user_id="+userid).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        if (res.block() != null) {
            return res.block();
        }

        return "";
    }
}
