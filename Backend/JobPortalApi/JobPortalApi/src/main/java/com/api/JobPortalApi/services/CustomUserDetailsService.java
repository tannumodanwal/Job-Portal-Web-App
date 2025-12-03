package com.api.JobPortalApi.services;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.repository.UserRepo;
import com.api.JobPortalApi.util.CustomUserDetails;

@Service

public class CustomUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService{

	@Autowired
    private UserRepo userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		 User user = userRepository.findByEmail(email)
                 .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
         return new CustomUserDetails(user);
	}

}
