package com.api.JobPortalApi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.api.JobPortalApi.entities.*;
public interface ApplicationRepo extends JpaRepository<Application, Long>{
	List<Application> findByCandidateId(Long candidateId);
    List<Application> findByJobId(Long jobId);
    boolean existsByCandidateIdAndJobId(Long candidateId, Long jobId);  
    @Query("SELECT COUNT(a) FROM Application a WHERE a.job.id = :jobId")
    int countApplications(@Param("jobId") Long jobId);
}
