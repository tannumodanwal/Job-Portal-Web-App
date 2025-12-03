package com.api.JobPortalApi.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.repository.*;

@Service
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    private CandidateProfileRepo repo; 
    @Autowired
    private UserRepo userRepo;
    @Override
    public CandidateProfile updateProfile(Long userId, CandidateProfile profile) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        // Fetch existing profile OR create new one
        CandidateProfile existing = repo.findByUserId(userId).orElse(new CandidateProfile());

        existing.setUser(user);

        // Update all normal fields
        existing.setFirstName(profile.getFirstName());
        existing.setLastName(profile.getLastName());
        existing.setCity(profile.getCity());
        existing.setState(profile.getState());
        existing.setCountry(profile.getCountry());
        existing.setPhoneNumber(profile.getPhoneNumber());
        existing.setQualification(profile.getQualification());
        existing.setWorkAuthorization(profile.getWorkAuthorization());
        existing.setSeekingEmployment(profile.getSeekingEmployment());

        existing.setSkillName(profile.getSkillName());  
        existing.setYearOfExperience(profile.getYearOfExperience());  
        existing.setExperienceLevel(profile.getExperienceLevel());

        existing.setResumeLink(profile.getResumeLink());

        // IMPORTANT: keep old image if new not uploaded
        if (profile.getProfilePhoto() != null) {
            existing.setProfilePhoto(profile.getProfilePhoto());
        }

        return repo.save(existing);
    }

	@Override
	public CandidateProfile getProfile(Long userId) {
		
		 return repo.findByUserId(userId)
	                .orElseThrow(() -> new RuntimeException("Profile not found"));
	}
}
