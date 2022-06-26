
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

/**
 * OAuth 2.0 Login with Microsoft AAD
 *
 * @version 1.03 2022-06-26
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends AADWebSecurityConfigurerAdapter {
    /**
     * HTTP Security configuration with OAuth 2.0 and Microsoft AAD
     * @param http http security instance
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        http
                .authorizeRequests((authorize) -> {
                            try {
                                authorize
                                        // set permissions
                                        .antMatchers(HttpMethod.GET, "/").permitAll()
                                        // set AAD roles
                                        .mvcMatchers(HttpMethod.GET, "/dayplan").hasRole("User")
                                        .mvcMatchers(HttpMethod.GET, "/overview").hasRole("User")
                                        .mvcMatchers(HttpMethod.GET, "/admin/**").hasRole("Admin")
                                        // allow resources
                                        .mvcMatchers("/js/***", "/css/**").permitAll()
                                        // set authentication
                                        .anyRequest().authenticated().and().oauth2Login()
                                        // configure custom oid user service
                                        .userInfoEndpoint().oidcUserService(this.oidcUserService());
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }
                )
                // Allow AAD OAuth 2.0
                .oauth2Login(Customizer.withDefaults());
    }

    /**
     * Map Microsoft AAD roles to Spring Security & Bearer
     * @return Custom OAuth2UserService
     *
     * @implNote Every User should only have one role
     */
    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcUserService delegate = new OidcUserService();

        return (userRequest) -> {
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();
            // Delegate to the default implementation for loading a user
            OidcUser oidcUser = delegate.loadUser(userRequest);
            // find all roles in claim
            oidcUser.getAuthorities().forEach(authority -> {
                if (OidcUserAuthority.class.isInstance(authority)) {
                    OidcUserAuthority oidcUserAuthority = (OidcUserAuthority) authority;
                    Map<String, Object> userInfo = oidcUserAuthority.getAttributes();
                    JSONArray roles = null;
                    // check for roles
                    if (userInfo.containsKey("roles")) {
                        try {
                            roles = (JSONArray) userInfo.get("roles");
                            roles.forEach(s -> {
                                // add role to Spring Security with ROLE_ prefix
                                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + (String) s));
                            });
                        } catch (Exception e) {
                            // TODO: Replace this with logger during implementation
                            e.printStackTrace();
                        }
                    }
                }
            });

            // create new OidUser with AAD role
            oidcUser = new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());

            return oidcUser;
        };
    }

}