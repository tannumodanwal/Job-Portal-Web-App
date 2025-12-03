package com.api.JobPortalApi.entities;

import org.hibernate.validator.constraints.URL;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "candidate_profile")
public class CandidateProfile {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    @NotBlank(message = "First name is required")
	    private String firstName;
	    @NotBlank(message = "Last name is required")
	    private String lastName;

	    @NotBlank(message = "City is required")
	    private String city;

	    @NotBlank(message = "State is required")
	    private String state;

	    @NotBlank(message = "Country is required")
	    private String country;

	    @NotNull(message = "Phone number is required")
	    @Digits(integer = 10, fraction = 0, message = "Phone number must be 10 digits")
	    private Long phoneNumber;

	    @NotBlank(message = "Qualification is required")
	    private String qualification;
	    @NotBlank(message = "Work Authorization is required")
	    private String workAuthorization;

	    @NotBlank(message = "Seeking Employment field is required")
	    private String seekingEmployment;

	    @NotBlank(message = "Skills are required")
	    @Column(columnDefinition = "TEXT")
	    private String skillName;  // JSON array

	    @NotBlank(message = "Year of experience is required")
	    @Column(columnDefinition = "TEXT")
	    private String yearOfExperience;

	    @NotBlank(message = "Experience level is required")
	    @Column(columnDefinition = "TEXT")
	    private String experienceLevel;
	    @NotBlank(message = "URL cannot be empty")
	    @URL(message = "Invalid URL format")
	    private String resumeLink;
	    private String profilePhoto;

	    @OneToOne
	    @JoinColumn(name = "user_id")
	    private User user;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
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

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public String getCountry() {
			return country;
		}

		public void setCountry(String country) {
			this.country = country;
		}

		public Long getPhoneNumber() {
			return phoneNumber;
		}

		public void setPhoneNumber(Long phoneNumber) {
			this.phoneNumber = phoneNumber;
		}

		public String getQualification() {
			return qualification;
		}

		public void setQualification(String qualification) {
			this.qualification = qualification;
		}

		public String getWorkAuthorization() {
			return workAuthorization;
		}

		public void setWorkAuthorization(String workAuthorization) {
			this.workAuthorization = workAuthorization;
		}

		public String getSeekingEmployment() {
			return seekingEmployment;
		}

		public void setSeekingEmployment(String seekingEmployment) {
			this.seekingEmployment = seekingEmployment;
		}

		public String getSkillName() {
			return skillName;
		}

		public void setSkillName(String skillName) {
			this.skillName = skillName;
		}

		public String getYearOfExperience() {
			return yearOfExperience;
		}

		public void setYearOfExperience(String yearOfExperience) {
			this.yearOfExperience = yearOfExperience;
		}

		public String getExperienceLevel() {
			return experienceLevel;
		}

		public void setExperienceLevel(String experienceLevel) {
			this.experienceLevel = experienceLevel;
		}

		public String getResumeLink() {
			return resumeLink;
		}

		public void setResumeLink(String resumeLink) {
			this.resumeLink = resumeLink;
		}

		public String getProfilePhoto() {
			return profilePhoto;
		}

		public void setProfilePhoto(String profilePhoto) {
			this.profilePhoto = profilePhoto;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		@Override
		public String toString() {
			return "CandidateProfile [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", city="
					+ city + ", state=" + state + ", country=" + country + ", phoneNumber=" + phoneNumber
					+ ", qualification=" + qualification + ", workAuthorization=" + workAuthorization
					+ ", seekingEmployment=" + seekingEmployment + ", skillName=" + skillName + ", yearOfExperience="
					+ yearOfExperience + ", experienceLevel=" + experienceLevel + ", resumeLink=" + resumeLink
					+ ", profilePhoto=" + profilePhoto + ", user=" + user + "]";
		}

		
		public CandidateProfile(Long id, @NotBlank(message = "First name is required") String firstName,
				@NotBlank(message = "Last name is required") String lastName,
				@NotBlank(message = "City is required") String city,
				@NotBlank(message = "State is required") String state,
				@NotBlank(message = "Country is required") String country,
				@NotNull(message = "Phone number is required") @Digits(integer = 10, fraction = 0, message = "Phone number must be 10 digits") Long phoneNumber,
				@NotBlank(message = "Qualification is required") String qualification,
				@NotBlank(message = "Work Authorization is required") String workAuthorization,
				@NotBlank(message = "Seeking Employment field is required") String seekingEmployment,
				@NotBlank(message = "Skills are required") String skillName,
				@NotBlank(message = "Year of experience is required") String yearOfExperience,
				@NotBlank(message = "Experience level is required") String experienceLevel,
				@NotBlank(message = "URL cannot be empty") @URL(message = "Invalid URL format") String resumeLink,
				String profilePhoto, User user) {
			super();
			this.id = id;
			this.firstName = firstName;
			this.lastName = lastName;
			this.city = city;
			this.state = state;
			this.country = country;
			this.phoneNumber = phoneNumber;
			this.qualification = qualification;
			this.workAuthorization = workAuthorization;
			this.seekingEmployment = seekingEmployment;
			this.skillName = skillName;
			this.yearOfExperience = yearOfExperience;
			this.experienceLevel = experienceLevel;
			this.resumeLink = resumeLink;
			this.profilePhoto = profilePhoto;
			this.user = user;
		}

		public CandidateProfile() {
			super();
			// TODO Auto-generated constructor stub
		}

		
}
