package com.api.JobPortalApi.services;

import java.util.List;


import com.api.JobPortalApi.entities.*;

public interface SavedJobService {
	String saveJob(Long candidateId, Long jobId);
    List<Job> getSavedJobs(Long candidateId);
}
