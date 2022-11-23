package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokcenter.AZN.helper.ds.Search;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

/**
 * Admin Controller
 *
 * @version 1.14 2022-11-11
 */
@Controller
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final WebClient webClient;

    /**
     * Check if user is admin
     * @param roles roles collection
     * @return true if admin
     * @throws Exception if user is not an admin
     */
    private boolean isAdmin(Collection<? extends GrantedAuthority> roles) throws Exception {
        if (roles.isEmpty()) {
            throw new Exception("No Role");

        } else if (Search.binarySearch(roles.stream()
                .toList().stream().map(Objects::toString).toList(), "ROLE_Admin") == -1) {
            throw new Exception("Not Authorized");
        }

        return true;
    }

    /**
     * Get admin related data with ROLE_Admin
     */
    private void getAdminData(String url, Authentication authentication,
                                  OAuth2AuthorizedClient authorizedClient, Model model) throws Exception {
        var roles = authentication.getAuthorities();

        if (roles.isEmpty()) {
            throw new Exception("No Role");
        }

        // find admin role
        Optional<? extends GrantedAuthority> role =  roles.stream().filter((e) ->
                e.toString().equals("ROLE_Admin")).findFirst();

        if (role.isEmpty()) {
            throw new Exception("User has no admin role");
        }

        String role_admin = role.get().toString();

        System.out.println(role_admin);

        // get data
        Mono<String> body = webClient.method(HttpMethod.GET)
                .uri(url)
                .body(Mono.just(Map.of("role", role_admin)), Map.class)
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve().bodyToMono(String.class);

        if (body.block() != null) {
            JsonNode jsonData = null;
            // get data and try to convert

            try {
                jsonData = new ObjectMapper().readTree(body.block());
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            model.addAttribute("data", jsonData);
        }

    }
    /**
     * Return Admin Panel for administration
     *
     * @param model The model to give our frond-end data
     * @return a html page
     */
    @GetMapping
    String getAdminPanel(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp")
    OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {
        // make get request and get data
        getAdminData("/admin", authentication, authorizedClient, model);

        return "adminPanel";
    }

    /**
     * Request Year Plan Data from userId
     *
     * @param userId requested userId
     *
     * @return Json Data
     */
    @GetMapping("/yearplan")
    @ResponseBody
    String getYearPlanOfUser(@RegisteredOAuth2AuthorizedClient("userwebapp")
                             OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                             @RequestParam(name = "userId") String userId) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            Mono<String> res = webClient.get().uri(String.format("/admin/years?userid=%s", userId)).
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                return new ObjectMapper().readTree(res.block()).toPrettyString();
            }
        }

        return "";
    }

    /**
     * Request Request Data from user
     *
     * @return Json Data
     */
    @GetMapping("/requests")
    @ResponseBody
    String getRequestsOfUser(@RegisteredOAuth2AuthorizedClient("userwebapp")
                             OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                             @RequestParam(name = "userId") String userId) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            Mono<String> res = webClient.get().uri(String.format("/admin/requests?userId=%s", userId)).
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                return new ObjectMapper().readTree(res.block()).toPrettyString();
            }
        }

        return "";
    }

    /**
     * Delete request from user

     * @return true or false
     */
    @PutMapping("/requests/delete")
    @CrossOrigin("/admin")
    @ResponseBody
    Boolean deleteRequestFromUser(@RegisteredOAuth2AuthorizedClient("userwebapp")
                                OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                                @RequestParam(name = "startDate", required = true) String startDate,
                                @RequestParam(name = "endDate", required = true) String endDate,
                                @RequestParam(name = "userid", required = true) String userId) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient
                    .delete()
                    .uri(String.format("/admin/requests/delete?startDate=%s&endDate=%s&userid=%s",
                            startDate, endDate, userId))
                    .attributes(oauth2AuthorizedClient(authorizedClient))
                    // send
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    // send
                    .retrieve()
                    // res type
                    .bodyToMono(Boolean.class)
                    .block());

        } else {
            return false;
        }
    }

    /**
     * Accept request from user
     *
     * @return true or false
     */
    @PutMapping("/requests/accept")
    @CrossOrigin("/admin")
    @ResponseBody
    Boolean AcceptRequestFromUser(@RegisteredOAuth2AuthorizedClient("userwebapp")
                                  OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                                  @RequestParam(name = "startDate", required = true) String startDate,
                                  @RequestParam(name = "endDate", required = true) String endDate,
                                  @RequestParam(name = "userid", required = true) String userId) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient
                    .put()
                    .uri(String.format("/admin/requests/accept?startDate=%s&endDate=%s&userid=%s",
                            startDate, endDate, userId))
                    .attributes(oauth2AuthorizedClient(authorizedClient))
                    // send
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    // send
                    .retrieve()
                    // res type
                    .bodyToMono(Boolean.class)
                    .block());

        } else {
            return false;
        }
    }

    /**
     *  get user month plan by user id

     * @return model
     */
    @GetMapping("/monthplan")
    String getMonthPlan(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                        Authentication authentication,
                        @RequestParam(name = "userid", required = true) String userid) {
        return "adminMonthPlan";
    }

    /**
     * Get User dayplan by userid

     * @return model
     */
    @GetMapping("/dayplan")
    String getAdminDayPlan(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                           Authentication authentication,
                           @RequestParam(name = "userid", required = true) String userid) {
        model.addAttribute("title", "Admin Day Plan");


        return "AdminDayPlan";
    }

    /**
     * Get user calendar by id

     * @return model
     */
    @GetMapping("/overview")
    String getAdminOverview(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                            Authentication authentication,
                            @RequestParam(name = "userid", required = true) String userid) {
        model.addAttribute("title", "Admin Overview");
        return "adminOverview";
    }

    /**
     * Accept AZN Submit
     */
    @PutMapping("/azn/accept")
    Boolean acceptAzn(@RegisteredOAuth2AuthorizedClient("userwebapp")
                      OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                      @RequestParam(name = "month", required = true) String month,
                      @RequestParam(name = "userid", required = true) String userId) {

        // Todo: Get month and user id
        // Todo: RServer put request
        // Todo: check role
        return true;
    }

    /**
     * Deny AZN Submit
     */
    @PutMapping("/azn/deny")
    Boolean denyAzn(@RegisteredOAuth2AuthorizedClient("userwebapp")
                    OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                    @RequestParam(name = "month", required = true) String month,
                    @RequestParam(name = "userid", required = true) String userId) {

        // Todo: Get month and user id
        // Todo: RServer put request
        // Todo: check role

        return true;
    }
}