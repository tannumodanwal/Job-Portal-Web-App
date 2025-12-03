package com.api.JobPortalApi.payloads;

import jakarta.validation.constraints.*;
public class RegisterRequest {
	@Email(message = "Invalid email format")
	@NotBlank(message = "Email is required")
	@Pattern(
	        regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$",
	        message = "Email must contain a valid domain like .com, .in, .org etc."
	)
	private String email;
    @NotBlank(message = "Password is required")
    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
        message = "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    private String password;

    @NotBlank(message = "Role is required")
    private String role;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
		
}
