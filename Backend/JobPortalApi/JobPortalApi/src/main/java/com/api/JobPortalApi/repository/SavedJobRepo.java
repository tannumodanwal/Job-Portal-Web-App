package com.api.JobPortalApi.repository;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;

import com.api.JobPortalApi.entities.*;

public interface SavedJobRepo extends JpaRepository<SavedJob, Long>{
	List<SavedJob> findByCandidateId(Long candidateId);

    boolean existsByCandidateIdAndJobId(Long candidateId, Long jobId);
}
