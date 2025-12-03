package com.api.JobPortalApi.services;

import java.util.List;
import com.api.JobPortalApi.entities.*;
import com.api.JobPortalApi.payloads.ApplicationDTO;
public interface ApplicationService {
	Application applyForJob(Long candidateId, Long jobId, String candidateResumeLink);
	    List<Application> getApplicationsForJob(Long jobId);
	    List<Application> getAppliedJobsByCandidate(Long candidateId);
	    void acceptApplication(Long appId);
	    void rejectApplication(Long appId);
	    List<ApplicationDTO> getApplicationsForJobs(Long jobId);
}
