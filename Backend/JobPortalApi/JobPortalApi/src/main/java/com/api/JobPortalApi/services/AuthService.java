package com.api.JobPortalApi.services;

import com.api.JobPortalApi.payloads.*;

public interface AuthService {
	AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
}
