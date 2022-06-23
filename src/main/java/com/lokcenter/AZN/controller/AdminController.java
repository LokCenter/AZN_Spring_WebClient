package com.lokcenter.AZN.controller;

import com.lokcenter.AZN.database.Repository.UserRepository;
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
    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Return Admin Panel for administration
     *
     * @param model The model to give our frond-end data
     * @return a html page
     */
    @GetMapping
    String getAdminPanel(Model model) {
        var userdata= userRepository.findAll();
        model.addAttribute("title", "Admin Panel");
        model.addAttribute("users", userdata);
        return "adminPanel";
    }
}
