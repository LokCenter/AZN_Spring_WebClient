package com.lokcenter.AZN.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.nimbusds.jose.shaded.json.JSONArray;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

/**
 * Handle Login
 */
@Controller
@RequestMapping("/")
public class LoginController {
    private final WebClient webClient;

    public LoginController(WebClient webClient) {
        this.webClient = webClient;
    }

    /**
     * Login Page
     */
    @GetMapping("/")
    String login() {
        return "login";
    }

    /**
     * Redirect user based on AAD Role
     */
    @GetMapping("/loginUser")
    String LoginRedirect(@RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                         Authentication authentication) {
        try {
            var user = (DefaultOidcUser) authentication.getPrincipal();

            try {
                // Microsoft email address e.g. username
                String username = user.getName();

                // current data without time
                Date currentDate = new Date();
                var dateFormat = new SimpleDateFormat("dd/MMM/yyyy");
                String date = dateFormat.format(currentDate);

                // playload
                Map<String, Object> payload = new HashMap<>();

                payload.put("username", username);
                payload.put("firstLogin", date);

                this.webClient
                        .post()
                        .uri("/login")
                        .attributes(oauth2AuthorizedClient(authorizedClient))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .body(Mono.just(payload), payload.getClass())
                        .retrieve()
                        // res type
                        .bodyToMono(Boolean.class)
                        .block();


            } catch (Exception ignore){}

            var roles = (JSONArray) user.getClaims().get("roles");

            System.out.println(roles.toString());

            if (roles.toString().contains("Admin")) {
                return "redirect:/admin";
            } else if (roles.toString().contains("User")) {
                return "redirect:/dayplan";
            } else {
                return "redirect:/noRole";
            }
        } catch (Exception ignore) {
            return "redirect:/noRole";
        }
    }
    /**
     * Basic Route to check Resource Server
     *
     * @implNote should not be used in production
     */
    @GetMapping("/test")
    String LoginRedirect(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {
        // request to the Resource Server backend
        String body = this.webClient
                .get()
                .uri("/test")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        model.addAttribute("testMessage", body);

        return "test";
    }
}
