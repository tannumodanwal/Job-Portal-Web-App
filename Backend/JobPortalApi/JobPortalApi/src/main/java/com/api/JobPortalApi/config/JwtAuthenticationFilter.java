package com.api.JobPortalApi.config;

import java.io.IOException;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.api.JobPortalApi.services.*;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

	    @Autowired
	    private JwtService jwtService;

	    @Autowired
	    private CustomUserDetailsService userDetailsService;

	    @Override
	    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	            throws ServletException, IOException {

	        try {
	            String jwt = parseJwt(request);
	            if (jwt != null && jwtService.validateToken(jwt)) {
	                String username = jwtService.extractUsername(jwt);
	                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

	                UsernamePasswordAuthenticationToken authentication =
	                        new UsernamePasswordAuthenticationToken(
	                                userDetails, null, userDetails.getAuthorities());

	                SecurityContextHolder.getContext().setAuthentication(authentication);
	            }
	        } catch (Exception ex) {
	            // optionally log
	        }

	        filterChain.doFilter(request, response);
	    }

	    private String parseJwt(HttpServletRequest request) {
	        String headerAuth = request.getHeader("Authorization");

	        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
	            return headerAuth.substring(7);
	        }
	        return null;
	    }
	
	
	
}
