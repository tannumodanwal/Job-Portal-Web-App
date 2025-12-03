package com.api.JobPortalApi.services;

import java.util.List;

import com.api.JobPortalApi.entities.*;

public interface RecruiterService {
	RecruiterProfile updateProfile(Long userId, RecruiterProfile profile);
    RecruiterProfile getProfile(Long userId);
    List<RecruiterProfile> getAllProfiles();
}
