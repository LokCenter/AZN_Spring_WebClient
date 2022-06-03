package com.lokcenter.AZN.controller;

import com.lokcenter.AZN.database.Repository.RoleRepository;
import com.lokcenter.AZN.database.Repository.UserRepository;
import com.lokcenter.AZN.database.User;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserRestController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public UserRestController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // WARNING: DO NOT USE GET MAPPING

    @PostMapping
    public ResponseEntity<?> postUser(@RequestBody JsonNode payload) {
        // NOTE: token expired is defaulted to 0;

        // check if role is provided and role exists
        if (payload.has("role") && roleRepository.findByName(payload.get("role").textValue()) != null) {
            String name  = payload.get("username").textValue();
            String password = payload.get("password").textValue();
            int token = 0; // not expired
            int enabled = payload.get("enabled").asInt();
            var roles = List.of(roleRepository.findByName(payload.get("role").textValue()));

            User user = new User(name, password, enabled, token, roles);

            System.out.println(payload);

            try {
                userRepository.save(user);

                // http response with error code CREADTED
                return new ResponseEntity<>(null, HttpStatus.CREATED);

            } catch (DataAccessException ignore) {
                return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
            }
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> DeleteUserByID(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            try {
                userRepository.delete(user.get());
                return new ResponseEntity<>(null, HttpStatus.FOUND);
            } catch (DataAccessException ignore) {
                return new ResponseEntity<>(null, HttpStatus.SERVICE_UNAVAILABLE);
            }
        }
    }

}
