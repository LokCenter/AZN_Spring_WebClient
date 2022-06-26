package com.lokcenter.AZN.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class LoginController {
    @GetMapping("/")
    String login() {
        return "login";
    }

    @GetMapping("/loginUser")
    String LoginRedirect(@RegisteredOAuth2AuthorizedClient("mauth2test") OAuth2AuthorizedClient authorizedClient,
                         Authentication authentication) {

        System.out.println(authentication.getAuthorities());

        if (authentication.getAuthorities().stream().anyMatch(r ->  r.getAuthority().equals("ROLE_ADMIN"))) {
            return "redirect:/admin";
        } else if (authentication.getAuthorities().stream().anyMatch(r ->  r.getAuthority().equals("ROLE_USER"))){
            return "redirect:/dayplan";
        } else {
            return "redirect:/noRole";
        }
    }
}
