package com.lokcenter.AZN.configs;

import com.lokcenter.AZN.authentication.UserDetailsServiceImpl;
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
    /**
     * Use custom UserDetailsService
     * @return A UserDetailsService
     */
    @Bean
    public UserDetailsService userDetailsService() {
       return new UserDetailsServiceImpl();
    }

    /**
     * Setup PasswordEncoder
     * @return PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // not secure only for testing
    }

    /**
     * Setup path and authentication rules and roles
     * @param http Servlet paths and http settings
     * @throws Exception Throw if something went wrong
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().and().formLogin().and().authorizeRequests()
                .mvcMatchers("/user/**").hasAnyRole("ADMIN", "USER")
                .mvcMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
                .mvcMatchers("/js/***", "/css/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().disable();
    }
}
