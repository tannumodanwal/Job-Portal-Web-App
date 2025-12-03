package com.api.JobPortalApi.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.services.*;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/jobs")
public class JobController {
	@Autowired
    private JobService jobService;
	
	    @PostMapping("/post/{recruiterId}")
	    public ResponseEntity<Job> postJob(
	            @PathVariable Long recruiterId,
	            @Valid @RequestBody Job job) {
	        return ResponseEntity.ok(jobService.postJob(recruiterId, job));
	    }

	    // 2️⃣ Get all jobs posted by a recruiter
	    @GetMapping("/recruiter/{recruiterId}")
	    public ResponseEntity<List<Job>> getJobsByRecruiter(@PathVariable Long recruiterId) {
	        return ResponseEntity.ok(jobService.getJobsByRecruiter(recruiterId));
	    }

	    // 3️⃣ Get a single job full details
	    @GetMapping("/{jobId}")
	    public ResponseEntity<Job> getJobDetails(@PathVariable Long jobId) {
	        return ResponseEntity.ok(jobService.getJobDetails(jobId));
	    }

	    @PutMapping("/{jobId}")
	    public ResponseEntity<Job> updateJob(
	            @PathVariable Long jobId,
	            @Valid @RequestBody Job job) {
	        return ResponseEntity.ok(jobService.updateJob(jobId, job));
	    }

	    
	    // 4️⃣ Delete job
	    @DeleteMapping("/{jobId}")
	    public ResponseEntity<String> deleteJob(@PathVariable Long jobId) {
	        jobService.deleteJob(jobId);
	        return ResponseEntity.ok("Job deleted successfully");
	    }
	
	    @GetMapping("/search")
	    public ResponseEntity<List<Job>> searchJobs(
	            @RequestParam(required = false) String keyword,
	            @RequestParam(required = false) String location,
	            @RequestParam(required = false) String jobType,
	            @RequestParam(required = false) String remoteType,
	            @RequestParam(required = false) String dateRange
	    ) {
	        return ResponseEntity.ok(
	                jobService.advancedSearch(keyword, location, jobType, remoteType, dateRange)
	        );
	    }


    
    
	
}
