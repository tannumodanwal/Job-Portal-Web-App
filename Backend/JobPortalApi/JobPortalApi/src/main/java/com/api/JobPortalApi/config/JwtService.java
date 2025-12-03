package com.api.JobPortalApi.config;

import java.util.Date;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.api.JobPortalApi.entities.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	 @Value("${jwt.secret}")
	    private String secretKey;

	    @Value("${jwt.expiration}")
	    private long jwtExpiration;

	    public String generateToken(User user) {
	        Map<String, Object> claims = new HashMap<>();
	        claims.put("role", user.getRole());
	        return createToken(claims, user.getEmail());
	    }

	    private String createToken(Map<String, Object> claims, String subject) {
	        return Jwts.builder()
	                .setClaims(claims)
	                .setSubject(subject)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
	                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
	                .compact();
	    }

	    public String extractUsername(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
	                .build()
	                .parseClaimsJws(token)
	                .getBody()
	                .getSubject();
	    }

	    public boolean validateToken(String token) {
	        try {
	            Jwts.parserBuilder()
	                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
	                    .build()
	                    .parseClaimsJws(token);
	            return true;
	        } catch (Exception ex) {
	            return false;
	        }
	    }

}
