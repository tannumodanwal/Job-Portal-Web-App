package com.api.JobPortalApi.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.services.*;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(origins = "http://localhost:5173")

public class RecruiterController {

	
	@Autowired
    private RecruiterService recruiterService;

    @Autowired
    private JobService jobService;

    @PutMapping("/profile/{userId}")
    public ResponseEntity<RecruiterProfile> updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody  RecruiterProfile profile) {
        return ResponseEntity.ok(recruiterService.updateProfile(userId, profile));
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<RecruiterProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(recruiterService.getProfile(userId));
    }

    @PutMapping("/post-job/{userId}")
    public ResponseEntity<Job> postJob(@PathVariable Long userId, @Valid @RequestBody Job job) {
        return ResponseEntity.ok(jobService.postJob(userId, job));
    }

    @GetMapping("/jobs/{userId}")
    public ResponseEntity<List<Job>> getAllJobs(@PathVariable Long userId) {
        return ResponseEntity.ok(jobService.getJobsByRecruiter(userId));
    }
    @GetMapping("/all")
    public ResponseEntity<List<RecruiterProfile>> getAllRecruiters() {
        return ResponseEntity.ok(recruiterService.getAllProfiles());
    }

}
