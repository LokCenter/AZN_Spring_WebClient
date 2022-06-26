
package com.lokcenter.AZN.configs;

import com.azure.spring.aad.webapp.AADWebSecurityConfigurerAdapter;

import com.azure.spring.autoconfigure.aad.AADAppRoleStatelessAuthenticationFilter;
import com.nimbusds.jose.shaded.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends AADWebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        http
                .authorizeRequests((authorize) -> {
                            try {
                                authorize
                                        .antMatchers(HttpMethod.GET, "/").permitAll()
                                        .mvcMatchers(HttpMethod.GET, "/dayplan").hasRole("User")
                                        .mvcMatchers(HttpMethod.GET, "/overview").hasRole("User")
                                        .mvcMatchers(HttpMethod.GET, "/admin/**").hasRole("Admin")
                                        .mvcMatchers("/js/***", "/css/**").permitAll()
                                        .anyRequest().authenticated().and().oauth2Login().userInfoEndpoint().oidcUserService(this.oidcUserService());
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }
                )
                .oauth2Login(Customizer.withDefaults());
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcUserService delegate = new OidcUserService();

        return (userRequest) -> {
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();
            // Delegate to the default implementation for loading a user
            OidcUser oidcUser = delegate.loadUser(userRequest);
            oidcUser.getAuthorities().forEach(authority -> {
                if (OidcUserAuthority.class.isInstance(authority)) {
                    OidcUserAuthority oidcUserAuthority = (OidcUserAuthority) authority;
                    Map<String, Object> userInfo = oidcUserAuthority.getAttributes();
                    JSONArray roles = null;
                    if (userInfo.containsKey("roles")) {
                        try {
                            roles = (JSONArray) userInfo.get("roles");
                            roles.forEach(s -> {
                                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + (String) s));
                            });
                        } catch (Exception e) {
                            // Replace this with logger during implementation
                            e.printStackTrace();
                        }
                    }
                }
            });
            oidcUser = new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());

            return oidcUser;
        };
    }

}