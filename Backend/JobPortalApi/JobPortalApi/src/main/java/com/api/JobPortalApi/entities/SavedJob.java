package com.api.JobPortalApi.entities;

import jakarta.persistence.*;
@Entity
@Table(name = "saved_jobs")
public class SavedJob {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

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
			return "SavedJob [id=" + id + ", candidate=" + candidate + ", job=" + job + "]";
		}

		public SavedJob(Long id, User candidate, Job job) {
			super();
			this.id = id;
			this.candidate = candidate;
			this.job = job;
		}

		public SavedJob() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
	
}
