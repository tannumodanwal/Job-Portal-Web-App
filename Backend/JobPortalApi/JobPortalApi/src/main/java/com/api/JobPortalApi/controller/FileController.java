package com.api.JobPortalApi.controller;

//import java.nio.file.Files;
//
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.JobPortalApi.entities.CandidateProfile;
import com.api.JobPortalApi.repository.CandidateProfileRepo;
import com.api.JobPortalApi.services.*;

@RestController
@RequestMapping("/api/file")
public class FileController {

	@Autowired
    private FileService fileService;

	@Autowired
    private CandidateProfileRepo repo;
	
	
	@PostMapping(value = "/upload/profile/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

    public ResponseEntity<String> uploadProfile(
            @RequestParam MultipartFile file,
            @PathVariable Long userId) {

        String fileName = fileService.uploadProfilePic(file, userId);
        return ResponseEntity.ok(fileName);
    }
	
	
//	@PostMapping(value = "/upload-resume/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//	public ResponseEntity<String> uploadResume(
//	        @RequestParam MultipartFile resume,
//	        @PathVariable Long userId) {
//
//	  
//	    return ResponseEntity.ok(fileName);
//	}


	

    @GetMapping("/download/{fileName}")
    public ResponseEntity<byte[]> download(@PathVariable String fileName) {
        byte[] fileBytes = fileService.downloadFile("src/main/resources/static/uploads/" + fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileBytes);
    }
	
}
