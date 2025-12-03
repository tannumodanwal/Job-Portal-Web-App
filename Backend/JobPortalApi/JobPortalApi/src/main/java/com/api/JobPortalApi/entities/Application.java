package com.api.JobPortalApi.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String appliedDate; 
    private String status = "PENDING";
    private String candidateResumeLink; 

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private User candidate;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAppliedDate() {
		return appliedDate;
	}

	public void setAppliedDate(String appliedDate) {
		this.appliedDate = appliedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCandidateResumeLink() {
		return candidateResumeLink;
	}

	public void setCandidateResumeLink(String candidateResumeLink) {
		this.candidateResumeLink = candidateResumeLink;
	}

	public User getCandidate() {
		return candidate;
	}

	public void setCandidate(User candidate) {
		this.candidate = candidate;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	@Override
	public String toString() {
		return "Application [id=" + id + ", appliedDate=" + appliedDate + ", status=" + status
				+ ", candidateResumeLink=" + candidateResumeLink + ", candidate=" + candidate + ", job=" + job + "]";
	}

	public Application(Long id, String appliedDate, String status, String candidateResumeLink, User candidate,
			Job job) {
		super();
		this.id = id;
		this.appliedDate = appliedDate;
		this.status = status;
		this.candidateResumeLink = candidateResumeLink;
		this.candidate = candidate;
		this.job = job;
	}

	public Application() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
