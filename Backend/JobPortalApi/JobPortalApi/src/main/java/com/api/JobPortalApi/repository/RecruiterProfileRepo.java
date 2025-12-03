package com.api.JobPortalApi.repository;

import java.util.Optional;



import org.springframework.data.jpa.repository.JpaRepository;

import com.api.JobPortalApi.entities.*;


public interface RecruiterProfileRepo extends JpaRepository<RecruiterProfile, Long>{
    Optional<RecruiterProfile> findByUserId(Long userId);

}
