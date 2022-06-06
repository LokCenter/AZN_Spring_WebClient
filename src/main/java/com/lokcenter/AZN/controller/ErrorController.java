package com.lokcenter.AZN.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Error Controller must be /error
 * @version 1.04 2022-06-04
 */
@Controller
@RequestMapping("/error")
public class ErrorController {
    /**
     * Show error page to the user
     * @param model The model params
     * @return Html page
     */
    @GetMapping
    String getErrorPage(Model model) {
        // title
        model.addAttribute("title", "Error");
        return "error";
    }
}
