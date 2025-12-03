package com.api.JobPortalApi.services;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.repository.*;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepo repo;
    
    @Autowired
    private ApplicationRepo applicationRepo;
    
    
    @Autowired
    private UserRepo userRepo;

    @Override
    public Job postJob(Long recruiterId, Job job) {

//        if (job.getPostedDate() == null || job.getPostedDate().isEmpty()) {
//            job.setPostedDate(LocalDate.now().toString());
//        }

        // fetch user from DB
        User recruiter = userRepo.findById(recruiterId)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        job.setRecruiter(recruiter);

        return repo.save(job);
    }

	@Override
	public List<Job> getJobsByRecruiter(Long recruiterId) {

	    List<Job> jobs = repo.findByRecruiterId(recruiterId);

	    return jobs.stream().map(job -> {
	        int count = applicationRepo.countApplications(job.getId());
	        job.setAppliedCount(count);
	        return job;
	    }).toList();
	}


	@Override
	public Job getJobDetails(Long jobId) {

	    Job job = repo.findById(jobId)
	            .orElseThrow(() -> new RuntimeException("Job not found"));

	    // ⭐ Count fetch karein
	    int count = applicationRepo.countApplications(jobId);

	    // ⭐ Job object me set karein
	    job.setAppliedCount(count);

	    return job;
	}

	@Override
	public void deleteJob(Long jobId) {
        repo.deleteById(jobId);
		
	}

	@Override
	public Job updateJob(Long jobId, Job updatedJob) {
		Job existingJob = repo.findById(jobId)
	            .orElseThrow(() -> new RuntimeException("Job not found"));

	    existingJob.setTitle(updatedJob.getTitle());
	    existingJob.setJobType(updatedJob.getJobType());
	    existingJob.setRemoteType(updatedJob.getRemoteType());
	    existingJob.setSalary(updatedJob.getSalary());
	    existingJob.setDescription(updatedJob.getDescription());
	    existingJob.setPostedDate(updatedJob.getPostedDate());
	    existingJob.setCity(updatedJob.getCity());
	    existingJob.setState(updatedJob.getState());
	    existingJob.setCountry(updatedJob.getCountry());
	    existingJob.setCompanyName(updatedJob.getCompanyName());

	    return repo.save(existingJob);
	}
	@Override
	public List<Job> advancedSearch(String keyword, String location, String jobType, String remoteType, String dateRange) {

	    List<Job> jobs = repo.findAll();

	    // Keyword filter
	    if (keyword != null && !keyword.trim().isEmpty()) {
	        String key = keyword.toLowerCase();
	        jobs = jobs.stream().filter(j ->
	            j.getTitle().toLowerCase().contains(key) ||
	            j.getDescription().toLowerCase().contains(key)
	        ).toList();
	    }

	    // Location filter
	    if (location != null && !location.trim().isEmpty()) {
	        String loc = location.toLowerCase();
	        jobs = jobs.stream().filter(j ->
	            j.getCity().toLowerCase().contains(loc) ||
	            j.getState().toLowerCase().contains(loc) ||
	            j.getCountry().toLowerCase().contains(loc)
	        ).toList();
	    }

	    // Job Type (Full-time / Part-time)
	    if (jobType != null && !jobType.isEmpty()) {
	        jobs = jobs.stream()
	                .filter(j -> j.getJobType().equalsIgnoreCase(jobType))
	                .toList();
	    }

	    // Remote Type (Remote / Office / Hybrid)
	    if (remoteType != null && !remoteType.isEmpty()) {
	        jobs = jobs.stream()
	                .filter(j -> j.getRemoteType().equalsIgnoreCase(remoteType))
	                .toList();
	    }

	    // Date filter (postedDate = YYYY-MM-DD)
	    if (dateRange != null && !dateRange.isEmpty()) {
	        LocalDate now = LocalDate.now();

	        jobs = jobs.stream().filter(job -> {
	            try {
	                LocalDate posted = LocalDate.parse(job.getPostedDate());

	                switch (dateRange) {
	                case "today":
	                    return posted.isEqual(now);

	                case "last7":
	                    return !posted.isBefore(now.minusDays(7)) && !posted.isAfter(now);

	                case "last30":
	                    return !posted.isBefore(now.minusDays(30)) && !posted.isAfter(now);

	                default:
	                    return true;
	            }

	            } catch (Exception e) {
	                return false;
	            }
	        }).toList();
	    }

	    return jobs;
	}


}
