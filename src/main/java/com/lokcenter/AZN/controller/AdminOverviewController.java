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
@RequestMapping("/admin/overview")

public class AdminOverviewController {
    @GetMapping
    String getAdminOverview(Model model) {
        model.addAttribute("title", "Admin Overview");
        return "adminOverview";
    }
}
