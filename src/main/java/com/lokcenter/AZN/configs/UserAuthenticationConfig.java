package com.lokcenter.AZN.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * User authentication settings and configurations
 * @version 1.08
 */
@Configuration
public class UserAuthenticationConfig extends WebSecurityConfigurerAdapter{
    @Autowired
    CustomSuccessHandler customSuccessHandler;
    /**
     * Setup path and authentication rules and roles
     * @param http Servlet paths and http settings
     * @throws Exception Throw if something went wrong
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.oauth2Login()
                .successHandler(customSuccessHandler).and().authorizeRequests()
                .mvcMatchers("/user/**").hasAnyAuthority("APPROLE_User", "APPROLE_Admin")
                .mvcMatchers("/").hasAuthority("APPROLE_User")
                .mvcMatchers("/overview").hasAuthority("APPROLE_User")
                .mvcMatchers(HttpMethod.GET, "/admin/**").hasAuthority("APPROLE_Admin")
                .mvcMatchers(HttpMethod.GET).permitAll()
                .mvcMatchers("/js/***", "/css/**").permitAll()
                .anyRequest().authenticated();
    }
}
