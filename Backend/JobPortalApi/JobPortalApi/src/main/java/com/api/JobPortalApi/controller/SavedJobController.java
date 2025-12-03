package com.api.JobPortalApi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.JobPortalApi.entities.Job;
import com.api.JobPortalApi.services.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

	   @Autowired
	    private SavedJobService savedJobService;

	    // Save a job for candidate
	    @PostMapping("/save")
	    public ResponseEntity<String> saveJob(@RequestBody Map<String, Long> data) {
	        Long candidateId = data.get("candidateId");
	        Long jobId = data.get("jobId");
	        return ResponseEntity.ok(savedJobService.saveJob(candidateId, jobId));
	    }

	    // Get all saved jobs for candidate
	    @GetMapping("/candidate/{candidateId}")
	    public ResponseEntity<List<Job>> getSavedJobs(@PathVariable Long candidateId) {
	        return ResponseEntity.ok(savedJobService.getSavedJobs(candidateId));
	    }
	
	    
}
