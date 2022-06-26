
package com.lokcenter.AZN.configs;

import com.azure.spring.aad.webapp.AADWebSecurityConfigurerAdapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfiguration extends AADWebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        http
                .authorizeRequests((authorize) -> authorize
                        .antMatchers(HttpMethod.GET, "/").permitAll()
                        .mvcMatchers(HttpMethod.GET, "/dayplan").hasAuthority("ROLE_USER")
                        .mvcMatchers("/user/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                        .mvcMatchers(HttpMethod.GET,"/overview").hasAuthority("ROLE_USER")
                        .mvcMatchers(HttpMethod.GET, "/admin/**").hasAuthority("ROLE_ADMIN")
                        .mvcMatchers("/js/***", "/css/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(Customizer.withDefaults());
    }

}