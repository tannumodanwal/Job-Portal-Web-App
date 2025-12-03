package com.api.JobPortalApi.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.api.JobPortalApi.config.*;
import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.payloads.*;
import com.api.JobPortalApi.repository.*;

@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;
	
	@Override
	public AuthResponse register(RegisterRequest request) {
		    User user = new User();
	        user.setEmail(request.getEmail());
	        user.setPassword(passwordEncoder.encode(request.getPassword()));
	        user.setRole(request.getRole()); // RECRUITER / CANDIDATE
	        userRepo.save(user);

	        String token = jwtService.generateToken(user);
	        return new AuthResponse(
	                user.getId(),
	                user.getEmail(),
	                token,
	                user.getRole()
	        );
	}

	@Override
	public AuthResponse login(AuthRequest request) {
		  User user = userRepo.findByEmail(request.getEmail())
	                .orElseThrow(() -> new RuntimeException("Invalid email"));

	        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	            throw new RuntimeException("Invalid password");
	        }

	        String token = jwtService.generateToken(user);
	        return new AuthResponse(
	                user.getId(),
	                user.getEmail(),
	                token,
	                user.getRole()
	        );
	}

	
	
}
