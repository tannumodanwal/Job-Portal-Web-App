package com.api.JobPortalApi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
@Table(name = "jobs")
public class Job {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "Job title is required")
	@Pattern(
	    regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
	    message = "Job title can contain only alphabets and special characters"
	)
	private String title;

	@NotBlank(message = "Job type is required")
	@Pattern(
	    regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
	    message = "Job type can contain only alphabets and special characters"
	)
	private String jobType;

	@NotBlank(message = "Remote type is required")
//	@Pattern(
//	    regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$"
//	)
	private String remoteType;

	@NotBlank(message = "Salary is required")
	private String salary;     // Salary me regex chahiye to bolo

	@NotBlank(message = "Description is required")
	@Column(columnDefinition = "TEXT")
	private String description;


    @NotBlank(message = "Posted date is required")
    private String postedDate;

    @NotBlank(message = "City is required")
    @Pattern(
        regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
        message = "City can contain only alphabets and special characters"
    )
    private String city;

    @NotBlank(message = "State is required")
    @Pattern(
        regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
        message = "State can contain only alphabets and special characters"
    )
    private String state;

    @NotBlank(message = "Country is required")
    @Pattern(
        regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
        message = "Country can contain only alphabets and special characters"
    )
    private String country;
    @Transient 
    private Integer appliedCount;
    @NotBlank(message = "Company name is required")
    @Column(name = "company_name")
    private String companyName;
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private User recruiter;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	public String getRemoteType() {
		return remoteType;
	}
	public void setRemoteType(String remoteType) {
		this.remoteType = remoteType;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPostedDate() {
		return postedDate;
	}
	public void setPostedDate(String postedDate) {
		this.postedDate = postedDate;
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
	public Integer getAppliedCount() {
		return appliedCount;
	}
	public void setAppliedCount(Integer appliedCount) {
		this.appliedCount = appliedCount;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public User getRecruiter() {
		return recruiter;
	}
	public void setRecruiter(User recruiter) {
		this.recruiter = recruiter;
	}
	@Override
	public String toString() {
		return "Job [id=" + id + ", title=" + title + ", jobType=" + jobType + ", remoteType=" + remoteType
				+ ", salary=" + salary + ", description=" + description + ", postedDate=" + postedDate + ", city="
				+ city + ", state=" + state + ", country=" + country + ", appliedCount=" + appliedCount
				+ ", companyName=" + companyName + ", recruiter=" + recruiter + "]";
	}
	
	public Job(Long id,
			@NotBlank(message = "Job title is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "Job title can contain only alphabets and special characters") String title,
			@NotBlank(message = "Job type is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "Job type can contain only alphabets and special characters") String jobType,
			@NotBlank(message = "Remote type is required")  String remoteType,
			@NotBlank(message = "Salary is required") String salary,
			@NotBlank(message = "Description is required") String description,
			@NotBlank(message = "Posted date is required") String postedDate,
			@NotBlank(message = "City is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "City can contain only alphabets and special characters") String city,
			@NotBlank(message = "State is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "State can contain only alphabets and special characters") String state,
			@NotBlank(message = "Country is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "Country can contain only alphabets and special characters") String country,
			Integer appliedCount, @NotBlank(message = "Company name is required") String companyName, User recruiter) {
		super();
		this.id = id;
		this.title = title;
		this.jobType = jobType;
		this.remoteType = remoteType;
		this.salary = salary;
		this.description = description;
		this.postedDate = postedDate;
		this.city = city;
		this.state = state;
		this.country = country;
		this.appliedCount = appliedCount;
		this.companyName = companyName;
		this.recruiter = recruiter;
	}
	public Job() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
