package com.api.JobPortalApi.payloads;

public class ApplicationStatusDTO {

	 private Long jobId;
	    private String status;
	    private String appliedDate;
		public Long getJobId() {
			return jobId;
		}
		public void setJobId(Long jobId) {
			this.jobId = jobId;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getAppliedDate() {
			return appliedDate;
		}
		public void setAppliedDate(String appliedDate) {
			this.appliedDate = appliedDate;
		}
	    
	    
	
	
}
