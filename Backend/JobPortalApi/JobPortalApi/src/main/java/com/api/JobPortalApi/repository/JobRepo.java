package com.api.JobPortalApi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.api.JobPortalApi.entities.*;

public interface JobRepo extends JpaRepository<Job, Long>{
	List<Job> findByRecruiterId(Long recruiterId);
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByCityContainingIgnoreCase(String city);
    @Query("SELECT COUNT(a) FROM Application a WHERE a.job.id = :jobId")
    int countApplications(@Param("jobId") Long jobId);

}
