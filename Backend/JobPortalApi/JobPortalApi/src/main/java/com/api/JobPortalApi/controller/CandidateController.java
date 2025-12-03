package com.api.JobPortalApi.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.services.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidate")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {

	@Autowired
    private CandidateService candidateService;

    @Autowired
    private SavedJobService savedJobService;

    @PutMapping("/profile/{userId}")
    public ResponseEntity<CandidateProfile> updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody CandidateProfile profile) {

        return ResponseEntity.ok(candidateService.updateProfile(userId, profile));
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<CandidateProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(candidateService.getProfile(userId));
    }

    @PostMapping("/save-job/{userId}/{jobId}")
    public ResponseEntity<?> saveJob(@PathVariable Long userId, @PathVariable Long jobId) {
        return ResponseEntity.ok(savedJobService.saveJob(userId, jobId));
    }

    @GetMapping("/saved-jobs/{userId}")
    public ResponseEntity<List<Job>> getSavedJobs(@PathVariable Long userId) {
        return ResponseEntity.ok(savedJobService.getSavedJobs(userId));
    }
    
    
}
