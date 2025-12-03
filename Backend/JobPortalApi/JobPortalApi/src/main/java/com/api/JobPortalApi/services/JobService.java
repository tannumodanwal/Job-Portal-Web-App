package com.api.JobPortalApi.services;

import java.util.List;
import com.api.JobPortalApi.entities.*;
public interface JobService {
	Job postJob(Long recruiterId, Job job);
    List<Job> getJobsByRecruiter(Long recruiterId);
    Job getJobDetails(Long jobId);
    void deleteJob(Long jobId);
    List<Job> advancedSearch(String keyword, String location, String jobType, String remoteType, String dateRange);
    Job updateJob(Long jobId, Job updatedJob);

}
