package com.api.JobPortalApi.repository;

import java.util.Optional;



import org.springframework.data.jpa.repository.JpaRepository;

import com.api.JobPortalApi.entities.*;


public interface CandidateProfileRepo extends JpaRepository<CandidateProfile, Long>{
	Optional<CandidateProfile> findByUserId(Long userId);	
}
