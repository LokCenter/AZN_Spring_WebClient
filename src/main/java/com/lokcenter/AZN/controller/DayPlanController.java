package com.lokcenter.AZN.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/")
public class DayPlanController {
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping
    String getDayPlan(Model model) {
        //TODO: Add DayPlan data

        // Page title
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        model.addAttribute("title", formatter.format(new Date()));

        return "dayPlan";
    }
}
