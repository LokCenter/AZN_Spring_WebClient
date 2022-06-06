package com.lokcenter.AZN.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Admin Controller
 *
 * @version 1.07 2022-05-29
 */
@Controller
@RequestMapping("/admin")
public class AdminController {
    /**
     * Return Admin Panel for administration
     *
     * @param model The model to give our frond-end data
     * @return a html page
     */
    @GetMapping
    String getAdminPanel(Model model) {
        return "adminPanel";
    }
}
