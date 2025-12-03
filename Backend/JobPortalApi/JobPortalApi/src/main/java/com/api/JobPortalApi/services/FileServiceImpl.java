package com.api.JobPortalApi.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.JobPortalApi.entities.CandidateProfile;
import com.api.JobPortalApi.entities.RecruiterProfile;
import com.api.JobPortalApi.repository.CandidateProfileRepo;
import com.api.JobPortalApi.repository.RecruiterProfileRepo;

@Service
public class FileServiceImpl implements FileService {

	
	@Autowired
    private CandidateProfileRepo candidateProfileRepo;
	
	@Autowired
    private RecruiterProfileRepo recruiterProfileRepo;

    private final String uploadDir = "src/main/resources/static/uploads/";
    private final String resumeDir = uploadDir + "resume/";
    private final String profileDir = uploadDir + "profile/";

    @Override
    public String uploadProfilePic(MultipartFile file, Long userId) {
        try {
            String fileName = "profile_" + userId + "_" + file.getOriginalFilename();
            Path savePath = Paths.get(profileDir + fileName);
            Files.createDirectories(savePath.getParent());
            Files.write(savePath, file.getBytes());

            // Pehle candidate check karo
            Optional<CandidateProfile> candidateOpt = candidateProfileRepo.findByUserId(userId);

            if (candidateOpt.isPresent()) {
                CandidateProfile profile = candidateOpt.get();
                profile.setProfilePhoto(fileName);
                candidateProfileRepo.save(profile);
            } else {
                // Agar candidate nahi to recruiter check karo
                RecruiterProfile recruiter = recruiterProfileRepo.findByUserId(userId)
                        .orElseThrow(() -> new RuntimeException("No Candidate or Recruiter profile found for userId: " + userId));
                recruiter.setProfilePhoto(fileName);
                recruiterProfileRepo.save(recruiter);
            }

            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile picture", e);
        }
    

    }

//    @Override
//    public String uploadResume(MultipartFile file, Long userId) {
//
//        try {
//            String uploadDir = "src/main/resources/static/uploads/resume/";
//
//            // directory create
//            Path uploadPath = Paths.get(uploadDir);
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            // unique filename
//            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//            Path filePath = uploadPath.resolve(fileName);
//
//            // save file
//            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            Optional<CandidateProfile> candidateOpt = candidateProfileRepo.findByUserId(userId);
//
//            CandidateProfile candidate = candidateOpt
//                    .orElseThrow(() -> new RuntimeException("Candidate not found with userId: " + userId));
//
//
//            if(candidate == null){
//                throw new RuntimeException("Candidate not found with userId: " + userId);
//            }
//
//            // save resume name in db
//            candidate.setResumeFile(fileName);
//            candidateProfileRepo.save(candidate);
//
//            return fileName;
//
//        } catch (Exception e) {
//            throw new RuntimeException("Resume upload failed => " + e.getMessage());
//        }
//    }
    @Override
    public byte[] downloadFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            return Files.readAllBytes(path);
        } catch (Exception ex) {
            throw new RuntimeException("Download failed");
        }
    }
	
}
