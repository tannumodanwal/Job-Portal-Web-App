package com.api.JobPortalApi.services;

import com.api.JobPortalApi.entities.*;

public interface CandidateService {
	CandidateProfile updateProfile(Long userId, CandidateProfile profile);
    CandidateProfile getProfile(Long userId);
}
