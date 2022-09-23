package com.lokcenter.AZN.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/yearplan")
public class YearPlanController {
    @GetMapping
    String GetYearPlan(Model model) {
        return "yearPlan";
    }
}
