package com.lokcenter.AZN.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Overview Controller -> Calendar View
 * @version 1.05 2022-05-28
 */
@Controller
// Calendar Site
@RequestMapping("/overview")
public class OverviewController {
    /**
     * Show the Calendar
     * @param model The model
     * @return Html page
     */
    @GetMapping
    String getOverviewPage(Model model) {
        return "overview";
    }
}
