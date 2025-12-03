package com.api.JobPortalApi.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "recruiter_profile")
public class RecruiterProfile {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@NotBlank(message = "First name is required")
	@Pattern(
	    regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
	    message = "First name can contain only alphabets and special characters"
	)
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Pattern(
	    regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
	    message = "Last name can contain only alphabets and special characters"
	)
	private String lastName;

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

	@NotBlank(message = "Company name is required")
	@Pattern(
	    regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$",
	    message = "Company can contain only alphabets and special characters"
	)
	private String company;

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
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
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
	
	
	public RecruiterProfile(Long id,
			@NotBlank(message = "First name is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "First name can contain only alphabets and special characters") String firstName,
			@NotBlank(message = "Last name is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "Last name can contain only alphabets and special characters") String lastName,
			@NotBlank(message = "City is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "City can contain only alphabets and special characters") String city,
			@NotBlank(message = "State is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "State can contain only alphabets and special characters") String state,
			@NotBlank(message = "Country is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "Country can contain only alphabets and special characters") String country,
			@NotBlank(message = "Company name is required") @Pattern(regexp = "^[A-Za-z\\s!@#$%^&*()_+=\\[\\]{};:'\",.<>/?|-]+$", message = "Company can contain only alphabets and special characters") String company,
			String profilePhoto, User user) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.city = city;
		this.state = state;
		this.country = country;
		this.company = company;
		this.profilePhoto = profilePhoto;
		this.user = user;
	}
	@Override
	public String toString() {
		return "RecruiterProfile [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", city=" + city
				+ ", state=" + state + ", country=" + country + ", company=" + company + ", profilePhoto="
				+ profilePhoto + ", user=" + user + "]";
	}
	public RecruiterProfile() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	
}
