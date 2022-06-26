package com.lokcenter.AZN.controller;

import mjson.Json;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import  com.fasterxml.jackson.databind.JsonNode;

import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * DayPlan Controller
 *
 * @version 1.02 2022-05-29
 */
@Controller
@RequestMapping("/dayplan")
public class DayPlanController {
    /**
     * Show "Tagesübersicht"
     * @param model add stuff to the frond-end
     * @return Html page
     */
    @GetMapping
    String getDayPlan(Model model, Authentication authentication) {
        //TODO: Add DayPlan data

        if (authentication.getAuthorities().stream().anyMatch(r ->  r.getAuthority().equals("APPROLE_Admin"))) {
          return "redirect:/admin";
        }

        // Page title
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        model.addAttribute("title", formatter.format(new Date()));

        return "dayPlan";
    }
}
