package com.lokcenter.AZN.controller;

import com.lokcenter.AZN.database.Repository.UserRepository;
import com.lokcenter.AZN.database.User;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * UserRestController test class
 * @version 1.03 2022-06-03
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class UserRestControllerTest {
    private Map<String, Object> data;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  RoleRepository roleRepository;

    @BeforeEach
    public void setup() {
        this.data = new HashMap<String, Object>();

        this.data.put("username", "peterson");
        this.data.put("password", "password123");
        this.data.put("enabled", 1);

        this.data.put("role", "ROLE_USER");
    }

    @AfterEach
    public void teardown() {
        // check if user was created
        if (userRepository.findByUsername((String) this.data.get("username")) != null) {
            User user = userRepository.findByUsername((String) this.data.get("username"));
            userRepository.delete(user);
        }
    }

    @WithMockUser(username = "Eizerl", password = "Hackerl", roles = "USER")
    @Test
    void postUser_should_not_work_with_role_user() throws Exception {
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.data.toString()))
                .andExpect(status().isForbidden());
    }

    @WithMockUser(username = "Huscher", password = "Saubartl", roles = "ADMIN")
    @Test
    void postUser_should_be_created() throws Exception {
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.valueOf(new JSONObject(this.data))))
                .andExpect(status().isCreated());
    }

    @WithMockUser(username = "PP", password = "sdfkljsd", roles = "ADMIN")
    @Test
    void postUser_should_be_created_only_once() throws Exception {
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.valueOf(new JSONObject(this.data))))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.valueOf(new JSONObject(this.data))))
                .andExpect(status().isNotAcceptable());
    }

    @WithMockUser(username = "PP", password = "sfd", roles = "USER")
    @Test
    void DeleteUserByID_should_not_be_allowed_for_non_admins() throws Exception {
        mockMvc.perform(delete("/user/444"))
                .andExpect(status().isForbidden());
    }

    @WithMockUser(username = "PP", password = "sfd", roles = "ADMIN")
    @Test
    void DeleteUserByID() throws Exception {
        // insert a user
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.valueOf(new JSONObject(this.data))))
                .andExpect(status().isCreated());

        // get id from user
        Long id = userRepository.findByUsername(String.valueOf(data.get("username"))).getId();

        mockMvc.perform(delete("/user/" + id))
                .andExpect(status().isFound());
    }

    @WithMockUser(username = "PP", password = "sfd", roles = "ADMIN")
    @Test
    void DeleteUserByID_should_not_be_found() throws Exception {
        mockMvc.perform(delete("/user/0"))
                .andExpect(status().isNotFound());
    }
}