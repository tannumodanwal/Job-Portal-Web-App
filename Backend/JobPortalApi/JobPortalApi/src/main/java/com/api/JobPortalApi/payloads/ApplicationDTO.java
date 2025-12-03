package com.api.JobPortalApi.payloads;

import java.util.List;

public class ApplicationDTO {

	    private Long id;
	    private String status;

	    private String firstName;
	    private String lastName;
	    private String email;
	    private String phone;
	    private String phoneNumber;   // ⭐ ADD
	    private String qualification; // ⭐ ADD

	    private List<String> skills;
	    private String candidateResumeLink;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}
		public String getQualification() {
			return qualification;
		}
		public void setQualification(String qualification) {
			this.qualification = qualification;
		}
		public List<String> getSkills() {
			return skills;
		}
		public void setSkills(List<String> skills) {
			this.skills = skills;
		}
		public String getCandidateResumeLink() {
			return candidateResumeLink;
		}
		public void setCandidateResumeLink(String candidateResumeLink) {
			this.candidateResumeLink = candidateResumeLink;
		}
		
	    
}
