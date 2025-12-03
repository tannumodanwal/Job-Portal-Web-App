package com.api.JobPortalApi.services;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.repository.*;
@Service   // <- yeh required tha

public class SavedJobServiceImpl implements SavedJobService{

	@Autowired
    private SavedJobRepo savedJobRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JobRepo jobRepo;
	
	@Override
	public String saveJob(Long candidateId, Long jobId) {
		// prevent duplicate save
        if (savedJobRepo.existsByCandidateIdAndJobId(candidateId, jobId)) {
            return "Job already saved!";
        }

        User candidate = userRepo.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        SavedJob saved = new SavedJob();
        saved.setCandidate(candidate);
        saved.setJob(job);

        savedJobRepo.save(saved);

        return "Job saved successfully!";
	}

	
	@Override
	public List<Job> getSavedJobs(Long candidateId) {
		
		return savedJobRepo.findByCandidateId(candidateId)
                .stream()
                .map(SavedJob::getJob)
                .collect(Collectors.toList());
	}

}
