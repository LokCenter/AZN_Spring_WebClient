package com.lokcenter.AZN.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mclogout")
public class logoutController {
    @GetMapping
    String getLogout() {
        return "logout";
    }
}
