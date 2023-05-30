package com.lokcenter.AZN.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lokcenter.AZN.helper.ControllerHelper;
import com.lokcenter.AZN.helper.JunitHelper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2Token;
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
    @CrossOrigin("/admin")
    @ResponseBody
    String getYearPlanOfUser(@RegisteredOAuth2AuthorizedClient("userwebapp")
                             OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                             @RequestParam(name = "userId") String userId) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            if (JunitHelper.isJUnitTest()) {
                return "junit";
            }

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
    @CrossOrigin("/admin")
    @ResponseBody
    String getRequestsOfUser(@RegisteredOAuth2AuthorizedClient("userwebapp")
                             OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                             @RequestParam(name = "userId") String userId) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            if (JunitHelper.isJUnitTest()) {
                return "junit";
            }
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
     *
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
            if (JunitHelper.isJUnitTest()) {
                return true;
            }
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
            if (JunitHelper.isJUnitTest()) {
                return true;
            }
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
    @CrossOrigin("/admin")
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

        if (JunitHelper.isJUnitTest()) {
            return "adminMonthPlan";
        }

        // make get request and get data
        Mono<String> res = webClient.get().uri(String.format("/monthplan?month=%s&year=%s&role=%s&userid=%s", month, year, role, userid)).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // make get request and get data
        Mono<String> resSoll = webClient.get().uri(String.format("/worktime/sollMonth?role=%s&month=%s&year=%s&userid=%s",
                        role, month, year, userid)).
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
        if (res.block() != null && resSoll.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonDataStatus = new ObjectMapper().readTree(resStatus.block());
            JsonNode jsonDataSoll = new ObjectMapper().readTree(resSoll.block());

            model.addAttribute("data", jsonData);
            model.addAttribute("title", "Monatsübersicht - Admin");
            model.addAttribute("status", jsonDataStatus);
            model.addAttribute("dataSoll", jsonDataSoll);

            return "adminMonthPlan";
        }

        throw new Exception("Bad request");

    }

    /**
     * Delete Calendar item from admin overview
     *
     * @implSpec Tag and id must be sent to remove calendar item
     * Tag should be of type String, Id should be of type String
     */
    @CrossOrigin("/admin")
    @PutMapping("/overview")
    @ResponseBody
    Boolean deleteCalendarItem(@RegisteredOAuth2AuthorizedClient("userwebapp")
                               OAuth2AuthorizedClient authorizedClient, Authentication authentication,
                               @RequestBody Map<String, Object> payload) throws Exception {

        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.DELETE)
                    .uri("admin/overview/delete")
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
    /**
     * Get user calendar by id

     * @return model
     *
     * @implNote request should only be made if firstday, lastday, month and year are added.
     */
    @GetMapping("/overview")
    @CrossOrigin("/admin")
    String getAdminOverview(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                            Authentication authentication,
                            @RequestParam(required = false, name = "firstday") String firstDate,
                            @RequestParam(required = false, name = "lastday") String lastDate,
                            @RequestParam(required = false, name = "month") String month,
                            @RequestParam(required = false, name = "year") String year,
                            @RequestParam(name = "userid", required = true) String userid) throws Exception {
        model.addAttribute("title", "Admin Overview");

        // check if there are any queries empty
        if (firstDate == null || lastDate == null || month == null || year == null) {
            return "adminOverview";
        }

        // User roles
        String role = ControllerHelper.getUserOrAdminRole(authentication);



        String query =String.format("firstday=%s&lastday=%s&month=%s&year=%s&role=%s&userid=%s", firstDate, lastDate,month, year, role, userid);
        String queryTwo = String.format("year=%s&role=%s&userid=%s", year, role, userid);

        Mono<String> res = webClient.get().uri("/overview?" + query).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        Mono<String> resStats = webClient.get().uri("/overview/stats?" + queryTwo).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        Mono<String> resBalance = webClient.get().uri("balance?" + queryTwo).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        // check if there is any data
        if (res.block() != null && resStats.block() != null && resBalance != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonDataStats = new ObjectMapper().readTree(resStats.block());
            JsonNode jsonDataBalance = new ObjectMapper().readTree(resBalance.block());

            model.addAttribute("data", jsonData);
            model.addAttribute("stats", jsonDataStats);
            model.addAttribute("balance", jsonDataBalance);

            return "adminOverview";
        }

        throw new Exception("Bad request");
    }

    /**
     * Show users
     *
     * @implSpec get username and userid from user.
     */
    @ResponseBody
    @GetMapping("/usernameList")
    String showUserNameList( @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {
        Mono<String> res = webClient.get().uri("admin/userlist").
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);


        if (res.block() != null) {
            return res.block();
        }

        return "";
    }

    /**
     * Show AZN-Abgaben
     */
    @ResponseBody
    @CrossOrigin("/admin")
    @GetMapping("azn/get")
    String getAZNSubmitted(@RequestParam(name = "userId") String userId, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) {
        Mono<String> res = webClient.get().uri("/admin/azn/get?userId="+userId).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

        if (res.block() != null) {
            return res.block();
        }

        return "";
    }

    /**
     * Accept AZN Submit
     *
     * @implSpec userid, year and month are required
     * userid should be of type String
     * year should be of type String
     * month should be of type Integer
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
     *
     * @implSpec userid, year and month are required
     * userid should be of type String
     * year should be of type String
     * month should be of type Integer
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

    /**
     *  Add default values for every user
     * @implSpec start_date, start_time, end_time, pause, vacation are required
     * start_date should be of type String
     * start_time should be of type String
     * end_time should be of type String
     * pause should be of type String
     * vacation should be of type String
     */
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

    /**
     * Request all default values
     */
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

    /**
     * Delete default value
     *
     * @implSpec start_date is required
     * start_date should be of type String
     */
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

    /**
     * Get admin general vacation data
     */
    @GetMapping("/generalOverview")
    @CrossOrigin("/admin")
    String getGeneralOverview(Model model, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                        Authentication authentication,
                        @RequestParam(required = false, name = "firstday") String firstDate,
                        @RequestParam(required = false, name = "lastday") String lastDate,
                        @RequestParam(required = false, name = "month") String month,
                        @RequestParam(required = false, name = "year") String year
                        ) throws Exception {
        model.addAttribute("title", "Admin Calendar");

        // check if there are any queries empty
        if (firstDate == null || lastDate == null || month == null || year == null) {
            return "generalOverview";
        }
        // User roles
        String role = ControllerHelper.getUserOrAdminRole(authentication);

        String query = String.format("firstday=%s&lastday=%s&month=%s&year=%s&role=%s", firstDate, lastDate,month, year, role);
        Mono<String> res = ControllerHelper.makeRequest(() ->
                webClient.get().uri("/admin/generalOverview?" + query).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class)).get();

        Mono<String> resStats = ControllerHelper.makeRequest(() ->
                webClient.get().uri("/admin/generalOverview/stats?year=" + year).
                attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class)).get();

        // check if there is any data
        if (res.block() != null) {
            JsonNode jsonData = new ObjectMapper().readTree(res.block());
            JsonNode jsonStats = new ObjectMapper().readTree(resStats.block());

            model.addAttribute("data", jsonData);
            model.addAttribute("stats", jsonStats);

            return "generalOverview";
        }

        throw new Exception("Bad request");
    }

    /**
     * Post general data
     */
   @PostMapping("/generalOverview/request")
   @CrossOrigin("/admin")
   @ResponseBody
   Boolean postGeneralOverview(@RequestBody Map<String, Object> payload,
                               @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                               Authentication authentication) throws Exception {
       if (isAdmin(authentication.getAuthorities())) {
           String query = String.format("startDate=%s&endDate=%s&tag=%s&comment=%s", payload.get("startDate"),
                   payload.get("endDate"),
                   payload.get("tag"),
                   payload.get("comment"));
           return Boolean.TRUE.equals(this.webClient.method(HttpMethod.POST)
                   .uri("/admin/generalOverview/request?"+query)
                   .attributes(oauth2AuthorizedClient(authorizedClient))
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
     * Delete item from calendar
     * @return
     */
    @PutMapping("/generalOverview")
    @CrossOrigin("/admin")
    @ResponseBody
    Boolean deleteCalendarItem(@RequestBody Map<String, Object> payload,  @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                               Authentication authentication) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.DELETE)
                    .uri("/admin/generalOverview/delete")
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

    /**
     * Save messages send from admin
     */
    @PostMapping("/azn/message")
    @CrossOrigin("/admin")
    @ResponseBody
    Boolean postMessage(@RequestBody Map<String, Object> payload, @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                        Authentication authentication) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.POST)
                    .uri("admin/azn/messages")
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

    /**
     * Save admin Requested Date to calendar
     */
    @PostMapping("/overview/request")
    @CrossOrigin("/admin")
    @ResponseBody
    boolean saveAdminRequest(@RequestBody Map<String, Object> payload,  @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient,
                             Authentication authentication) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.POST)
                    .uri("/admin/overview/request")
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

    @GetMapping("/worktimeList")
    @CrossOrigin("/admin")
    @ResponseBody
    String getWorkTimeListByUser(@RequestParam(name = "userId") String userId, Authentication authentication,
                                 @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            Mono<String> res = webClient.get().uri("admin/worktimeList?userId="+userId).
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                return new ObjectMapper().readTree(res.block()).toPrettyString();
            }
        }

        return null;
    }

    /**
     * Get a list of all years and vacation by user
     * @param userId userid
     *
     * @return json string
     */
    @CrossOrigin("/admin")
    @GetMapping("/yearsList")
    @ResponseBody
    String getVacationByUser(@RequestParam(name = "userId") String userId, Authentication authentication,
                             @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            Mono<String> res = webClient.get().uri("admin/yearsList?userId="+userId).
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                return new ObjectMapper().readTree(res.block()).toPrettyString();
            }
        }

        return null;
    }

    /**
     * Post edit by user
     * @param payload user data to change
     * @param userId userid from user
     * @return true or false
     */
    @PostMapping("/edit")
    @CrossOrigin("/admin")
    @ResponseBody
    Boolean postAdminEditData(@RequestBody Map<String, Object> payload, @RequestParam(name = "userId") String userId, Authentication authentication,
                              @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.POST)
                    .uri("admin/edit?userId=" + userId)
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

    /**
     * Get start date and end date by user
     * @param userId
     * @param authentication
     * @param authorizedClient
     * @return
     * @throws Exception
     */
    @CrossOrigin("/admin")
    @GetMapping("/startend")
    @ResponseBody
    String getStartEndDateByUser(@RequestParam(name = "userId") String userId, Authentication authentication,
                             @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            Mono<String> res = webClient.get().uri("admin/startend?userId="+userId).
                    attributes(oauth2AuthorizedClient(authorizedClient)).retrieve().bodyToMono(String.class);

            // check if there is any data
            if (res.block() != null) {
                return new ObjectMapper().readTree(res.block()).toPrettyString();
            }
        }

        return null;
    }

    @PutMapping("/deleteUser")
    @ResponseBody
    Boolean deleteUserById(@RequestParam(name = "userId") String userId,Authentication authentication,
                           @RegisteredOAuth2AuthorizedClient("userwebapp") OAuth2AuthorizedClient authorizedClient ) throws Exception {
        if (isAdmin(authentication.getAuthorities())) {
            return Boolean.TRUE.equals(this.webClient.method(HttpMethod.DELETE)
                    .uri("/admin/deleteUser?userId="+ userId)
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
}