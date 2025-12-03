package com.api.JobPortalApi.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	String uploadProfilePic(MultipartFile file, Long userId);
    //String uploadResume(MultipartFile file, Long userId);
    byte[] downloadFile(String filePath);
}
