package com.jobquestbackend;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
// import java.util.Optional;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, ObjectId> {
    List<JobApplication> findByJobId(ObjectId jobId);
}
 