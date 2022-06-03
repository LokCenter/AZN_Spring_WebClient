package com.lokcenter.AZN.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/user")
public class UserRestController {
    // WARNING: DO NOT USE GET MAPPING
}
