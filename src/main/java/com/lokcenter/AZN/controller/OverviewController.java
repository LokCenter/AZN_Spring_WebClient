package com.lokcenter.AZN.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
// Calendar Site
@RequestMapping("/overview")
public class OverviewController {
    @GetMapping
    String getOverviewPage(Model model) {
        return "overview";
    }
}
