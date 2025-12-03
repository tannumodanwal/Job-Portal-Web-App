package com.api.JobPortalApi.services;

import java.time.LocalDate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.payloads.ApplicationDTO;
import com.api.JobPortalApi.repository.*;

import tools.jackson.databind.ObjectMapper;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepo repo;
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JobRepo jobRepo;
    
    @Autowired
    private CandidateProfileRepo candidateProfileRepo;


    @Override
    public Application applyForJob(Long candidateId, Long jobId, String candidateResumeLink) {

        if (repo.existsByCandidateIdAndJobId(candidateId, jobId)) {
            throw new RuntimeException("Already applied for this job");
        }

        User candidate = userRepo.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = new Application();
        application.setCandidate(candidate);
        application.setJob(job);
        application.setAppliedDate(LocalDate.now().toString());

        application.setCandidateResumeLink(candidateResumeLink); // ⭐ Correct field name

        return repo.save(application);
    }

	@Override
	public List<Application> getApplicationsForJob(Long jobId) {
        return repo.findByJobId(jobId);

	}

	@Override
	public List<Application> getAppliedJobsByCandidate(Long candidateId) {
        return repo.findByCandidateId(candidateId);

	}

	
	@Override
	public void acceptApplication(Long appId) {
	    Application app = repo.findById(appId)
	            .orElseThrow(() -> new RuntimeException("Application not found"));
	    app.setStatus("ACCEPTED");
	    repo.save(app);
	}

	@Override
	public void rejectApplication(Long appId) {
	    Application app = repo.findById(appId)
	            .orElseThrow(() -> new RuntimeException("Application not found"));
	    app.setStatus("REJECTED");
	    repo.save(app);
	}

	@Override
	public List<ApplicationDTO> getApplicationsForJobs(Long jobId) {

	    List<Application> apps = repo.findByJobId(jobId);

	    return apps.stream().map(app -> {

	        ApplicationDTO dto = new ApplicationDTO();

	        dto.setId(app.getId());
	        dto.setStatus(app.getStatus());

	        // user
	        User user = app.getCandidate();
	        dto.setEmail(user.getEmail());

	        // profile
	        CandidateProfile profile = candidateProfileRepo.findByUserId(user.getId()).orElse(null);

	        if (profile != null) {
	            dto.setFirstName(profile.getFirstName());
	            dto.setLastName(profile.getLastName());
	            dto.setPhoneNumber(String.valueOf(profile.getPhoneNumber()));
	            dto.setQualification(profile.getQualification());

	            // ⭐ SKILLS
	            if (profile.getSkillName() != null) {
	                try {
	                    ObjectMapper mapper = new ObjectMapper();
	                    List<String> skills = mapper.readValue(profile.getSkillName(), List.class);
	                    dto.setSkills(skills);
	                } catch (Exception e) {
	                    dto.setSkills(List.of());
	                }
	            }
	        }

	        dto.setCandidateResumeLink(app.getCandidateResumeLink());

	        return dto;

	    }).collect(Collectors.toList());
	}


	
	 

}
