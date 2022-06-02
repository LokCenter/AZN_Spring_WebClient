package com.lokcenter.AZN.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class ErrorController {
    @GetMapping
    String getErrorPage(Model model) {
        // title
        model.addAttribute("title", "Error");
        return "error";
    }
}
