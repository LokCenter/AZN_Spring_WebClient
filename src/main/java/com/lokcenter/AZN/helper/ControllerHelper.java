package com.lokcenter.AZN.helper;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

/**
 * Helper methods used in multiple controller
 */
public class ControllerHelper {
    /**
     * Check if user is an admin
     * @param roles user roles
     */
    public static Boolean isAdmin(Collection<? extends GrantedAuthority> roles) throws Exception {
        if (roles.isEmpty()) {
            throw new Exception("No Role");

        } else if (Collections.binarySearch(roles.stream()
                .toList().stream().map(Objects::toString).toList().stream().sorted().toList(), "ROLE_Admin") == -1) {
            throw new Exception("Not Authorized");
        }

        return true;
    }

    /**
     * Get admin role as string
     * @param authentication Spring authentication
     *
     * @return admin role
     */
    public static String getAdminRole(Authentication authentication) throws Exception {
        var roles = authentication.getAuthorities();

        if (roles.isEmpty()) {
            throw new Exception("No Role");
        }

        // find admin role
        Optional<? extends GrantedAuthority> role = roles.stream().filter((e) ->
                e.toString().equals("ROLE_Admin")).findFirst();

        if (role.isEmpty()) {
            throw new Exception("User has no admin role");
        }

        return role.get().toString();
    }

    /**
     * Get admin role as string
     * @param authentication Spring authentication
     *
     * @return user role
     */
    public static String getUserRole(Authentication authentication) throws Exception {
        var roles = authentication.getAuthorities();

        if (roles.isEmpty()) {
            throw new Exception("No Role");
        }

        // find admin role
        Optional<? extends GrantedAuthority> role = roles.stream().filter((e) ->
                e.toString().equals("ROLE_User")).findFirst();

        if (role.isEmpty()) {
            throw new Exception("User has no user role");
        }

        return role.get().toString();
    }

    /**
     * Get User or admin role
     *
     * @implNote Admin role should be checked first than user role!!!
     */
    public static String getUserOrAdminRole(Authentication authentication) throws Exception {
        Optional<String> role = Optional.empty();
        // try to get admin role
        try {
           role = Optional.ofNullable(getAdminRole(authentication));
           return role.get();
        }catch (Exception ignore) {}

        // try to get user role
        try {
            role  = Optional.ofNullable(getUserRole(authentication));
        } catch (Exception ignore){}

        if (role.isEmpty()) {
            throw new Exception("No Role");
        }

        return role.get();
    }
}