package com.lokcenter.AZN.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * DayPlan Controller
 *
 * @version 1.02 2022-05-29
 */
@Controller
@RequestMapping("/")
public class DayPlanController {
    /**
     * Show "Tagesübersicht"
     * @param model add stuff to the frond-end
     * @return Html page
     */
    @GetMapping
    String getDayPlan(Model model) {
        //TODO: Add DayPlan data

        // Page title
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        model.addAttribute("title", formatter.format(new Date()));

        return "dayPlan";
    }
}
