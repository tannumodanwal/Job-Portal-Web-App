package com.api.JobPortalApi.payloads;

public class AuthResponse {
	private Long id;
	private String email;   // email sabse pehle
    private String token;   // fir token
    private String role;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "AuthResponse [id=" + id + ", email=" + email + ", token=" + token + ", role=" + role + "]";
	}
	public AuthResponse(Long id, String email, String token, String role) {
		super();
		this.id = id;
		this.email = email;
		this.token = token;
		this.role = role;
	}
	public AuthResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    
    
}
