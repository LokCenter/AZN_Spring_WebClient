package com.lokcenter.AZN.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/noRole")
public class NoRoleController {
    @GetMapping
    String getNoRole(Model model, Authentication authentication) {
        model.addAttribute("title", "User has no role");
        model.addAttribute("username", authentication != null ? authentication.getName() : "null");
        model.addAttribute("hasRole", authentication != null
                && authentication.getAuthorities().size() > 0);

        return "noRole";
    }
}
