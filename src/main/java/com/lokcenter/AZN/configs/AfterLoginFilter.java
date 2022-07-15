package com.lokcenter.AZN.configs;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * AfterLoginFilter
 * <p>
 * Get login time from user
 *
 * @version 1.02 15-07-22
 */
public class AfterLoginFilter extends OncePerRequestFilter {
    /**
     * Exclude from this filter
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        return !path.startsWith("/loginUser");
    }


    /**
     * get current request and extract username from it
     *
     * @implNote Resource Server should check if first_login time exist. No checks will be made here!!!
     */

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // get username
        Principal principal = request.getUserPrincipal();

        // check if principal is the right class
        if (principal != null) {
            // Microsoft email address e.g. username
            String username = principal.getName();

            // current data without time
            Date currentDate = new Date();
            var dateFormat = new SimpleDateFormat("dd/MMM/yyyy");
            String date = dateFormat.format(currentDate);

            // TODO: Create webapp Controller to post first login
            // TODO: Create resource Controller to save first login
            System.out.println(date);
            System.out.println(username);
        }

        filterChain.doFilter(request, response);
    }
}