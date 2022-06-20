package com.lokcenter.AZN.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Admin DayPlan Controller
 *
 * @version 1.01 2022-06-20
 */
@Controller
@RequestMapping("/admin/dayplan")

public class AdminDayPlanController {
    @GetMapping
    String getAdminPanel(Model model) {
        model.addAttribute("title", "Admin Day Plan");
        return "AdminDayPlan";
    }
}
