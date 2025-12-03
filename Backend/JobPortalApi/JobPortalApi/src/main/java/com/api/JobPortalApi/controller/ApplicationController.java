package com.api.JobPortalApi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.payloads.ApplicationDTO;
import com.api.JobPortalApi.payloads.ApplicationStatusDTO;
import com.api.JobPortalApi.services.*;



@RestController
@RequestMapping("/api/apply")

public class ApplicationController {
	
	@Autowired
    private ApplicationService applicationService;

	@PostMapping("/{userId}/{jobId}")
	public ResponseEntity<Application> apply(
	        @PathVariable Long userId,
	        @PathVariable Long jobId,
	        @RequestBody Map<String, String> body) {

	    String candidateResumeLink = body.get("candidateResumeLink");

	    return ResponseEntity.ok(
	            applicationService.applyForJob(userId, jobId, candidateResumeLink)
	    );
	}



    
	@GetMapping("/applied-jobs/{userId}")
	public ResponseEntity<List<ApplicationStatusDTO>> getAppliedJobs(@PathVariable Long userId) {

	    List<Application> apps = applicationService.getAppliedJobsByCandidate(userId);

	    List<ApplicationStatusDTO> result = apps.stream().map(app -> {

	        ApplicationStatusDTO dto = new ApplicationStatusDTO();
	        dto.setJobId(app.getJob().getId());
	        dto.setStatus(app.getStatus());
	        dto.setAppliedDate(app.getAppliedDate());

	        return dto;

	    }).toList();

	    return ResponseEntity.ok(result);
	}


    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId));
    }

    
 // Recruiter Accept Application
    @PutMapping("/{appId}/accept")
    public ResponseEntity<String> accept(@PathVariable Long appId) {
        applicationService.acceptApplication(appId);
        return ResponseEntity.ok("Application accepted");
    }

    // Recruiter Reject Application
    @PutMapping("/{appId}/reject")
    public ResponseEntity<String> reject(@PathVariable Long appId) {
        applicationService.rejectApplication(appId);
        return ResponseEntity.ok("Application rejected");
    }
    
    @GetMapping("/jobs/{jobId}/applications")
    public ResponseEntity<List<ApplicationDTO>> getApplications(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsForJobs(jobId));
    }
}
