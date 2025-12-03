package com.api.JobPortalApi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.repository.*;

@Service

public class RecruiterServiceImpl implements RecruiterService{
	
	    @Autowired
	    private RecruiterProfileRepo repo;
	    
	    @Autowired
	    private UserRepo userRepo;

		@Override
		public RecruiterProfile updateProfile(Long userId, RecruiterProfile profile) {
			 User user = userRepo.findById(userId)
			            .orElseThrow(() -> new RuntimeException("Recruiter/User not found"));

			    // Check if previous profile exists
			    RecruiterProfile existingProfile = repo.findByUserId(userId).orElse(new RecruiterProfile());

			    existingProfile.setUser(user);
			    existingProfile.setFirstName(profile.getFirstName());
			    existingProfile.setLastName(profile.getLastName());
			    existingProfile.setCity(profile.getCity());
			    existingProfile.setState(profile.getState());
			    existingProfile.setCountry(profile.getCountry());
			    existingProfile.setCompany(profile.getCompany());
			    existingProfile.setProfilePhoto(profile.getProfilePhoto());

			    return repo.save(existingProfile);
		}

		@Override
		public RecruiterProfile getProfile(Long userId) {

			 return repo.findByUserId(userId)
		                .orElseThrow(() -> new RuntimeException("Profile not found"));
		}

		@Override
		public List<RecruiterProfile> getAllProfiles() {
	        return repo.findAll();

		}

	
	    
	    

}
