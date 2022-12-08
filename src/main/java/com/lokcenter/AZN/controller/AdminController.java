package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokcenter.AZN.helper.ControllerHelper;
import com.lokcenter.AZN.helper.JunitHelper;
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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import static com.lokcenter.AZN.helper.ControllerHelper.getAdminRole;
import static com.lokcenter.AZN.helper.ControllerHelper.isAdmin;
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
     * Get admin related data with ROLE_Admin
     */
    private void getAdminData(String url, Authentication authentication,
                              OAuth2AuthorizedClient authorizedClient, Model model, Boolean asPayload) throws Exception {

        String role_admin = getAdminRole(authentication);

        Mono<String> body;

        // get data
        if (asPayload) {
            body = webClient.method(HttpMethod.GET)
                    .uri(url)
                    .body(Mono.just(Map.of("role", role_admin)), Map.class)
                    .attributes(oauth2AuthorizedClient(authorizedClient))
                    .retrieve().bodyToMono(String.class);
        } else {
            body = webClient.method(HttpMethod.GET)
                    .uri(url)
                    .attributes(oauth2AuthorizedClient(authorizedClient))
                    .retrieve().bodyToMono(String.class);
        }




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
    @CrossOrigin("/admin")
    @GetMapping
    String getAdminPanel(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp")
    OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {
        if (JunitHelper.isJUnitTest()) {
            return "adminPanel";
        }

        // make get request and get data
        getAdminData("/admin", authentication, authorizedClient, model, true);

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
                        @RequestParam(name = "month", required = false) String month,
                        @RequestParam(name = "year", required = false) String year,
                        @RequestParam(name = "userid", required = true) String userid) throws Exception {

        // generate date if no date
        if (year == null || month == null) {
            LocalDate currDate = LocalDate.now();

            month = String.valueOf(currDate.getMonthValue());
            year = String.valueOf(currDate.getYear());
        } else {
            month = String.valueOf(Integer.parseInt(month) + 1);
        }

        String role = ControllerHelper.getAdminRole(authentication);

        // make get request and get data
        Mono<String> res = webClient.get().uri(String.format("/monthplan?month=%s&year=%s&role=%s&userid=%s", month, year, role, userid)).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        Mono<String> resStatus = webClient.method(HttpMethod.GET).uri("monthplan/status").
                attributes(oauth2AuthorizedClient(authorizedClient))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // send
                .body(Mono.just(Map.of(
                        "month", month,
                        "year", year,
                        "role", role,
                        "userId", userid)), Map.class)
                .retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonDataStatus = new ObjectMapper().readTree(resStatus.block());

            model.addAttribute("data", jsonData);
            model.addAttribute("title", "Monatsübersicht - Admin");
            model.addAttribute("status", jsonDataStatus);

            return "adminMonthPlan";
        }

        throw new Exception("Bad request");

    }

    /**
     * Get User dayplan by userid

     * @return model
     */
    @GetMapping("/dayplan")
    String getAdminDayPlan(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                           Authentication authentication,
                           @RequestParam(name = "userid", required = true) String userid,
                           @RequestParam(name = "date", required = false) String date) throws Exception {
        model.addAttribute("title", "Admin Day Plan");

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

        getAdminData(String.format("/dayplan?date=%s&role=%s&userid=%s", dateString, getAdminRole(authentication), userid),
                authentication, authorizedClient, model, false);

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
     * Show users
     */
    @ResponseBody
    @GetMapping("/usernameList")
    String showUserNameList( @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                             Authentication authentication) throws JsonProcessingException {
        Mono<String> res = webClient.get().uri("admin/userlist").
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);


        if (res.block() != null) {
            System.out.println(res.block());
            return res.block();
        }

        return "";
    }

    /**
     * Calendar delete calendar range
     */
    @PutMapping("/calendar/delete")
    @ResponseBody
    Boolean deleteCalendarRange() {
        // TODO: delete calendar range with user id
        return true;
    }

    /**
     * Show AZN-Abgaben
     */
    @ResponseBody
    @GetMapping("azn/get")
    String getAZNSubmitted() {
        // TODO: Show submited azn data
        return "";
    }

    /**
     * Accept AZN Submit
     */
    @ResponseBody
    @PutMapping("/azn/accept")
    Boolean acceptAzn(@RegisteredOAuth2AuthorizedClient("userwebapp")
                      OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                      @RequestBody Map<String, Object> payload) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient
                    .put()
                    .uri("/admin/azn/accept")
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


        return false;
    }

    /**
     * Deny AZN Submit
     */
    @ResponseBody
    @PutMapping("/azn/deny")
    Boolean denyAzn(@RegisteredOAuth2AuthorizedClient("userwebapp")
                    OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                    @RequestBody Map<String, Object> payload) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient
                    .put()
                    .uri("/admin/azn/deny")
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

        return false;
    }

    @PostMapping("defaults/add")
    @ResponseBody
    Boolean addDefaults(@RequestBody Map<String, Object> payload, @RegisteredOAuth2AuthorizedClient("userwebapp")
    OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {
        // user must be admin
        if (ControllerHelper.isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient
                    .post()
                    .uri("admin/defaults/add")
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

        return false;
    }

    @GetMapping("/defaults/get")
    @ResponseBody
    String getDefaults(@RegisteredOAuth2AuthorizedClient("userwebapp")
                       OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            Mono<String> res = webClient.get().uri("/admin/defaults/get").
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                return new ObjectMapper().readTree(res.block()).toPrettyString();
            }
        }

        return "";
    }

    @PutMapping("/defaults/delete")
    @ResponseBody
    Boolean deleteDefaults(@RequestBody Map<String, Object> payload, @RegisteredOAuth2AuthorizedClient("userwebapp")
    OAuth2AuthorizedClient authorizedClient, Authentication authentication) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.DELETE)
                    .uri("admin/defaults/delete")
                    .attributes(oauth2AuthorizedClient(authorizedClient))
                    // send
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    // send
                    .body(Mono.just(payload), payload.getClass())
                    .retrieve()
                    // res type
                    .bodyToMono(Boolean.class)
                    .block());

        } else {
            return false;
        }
    }
}