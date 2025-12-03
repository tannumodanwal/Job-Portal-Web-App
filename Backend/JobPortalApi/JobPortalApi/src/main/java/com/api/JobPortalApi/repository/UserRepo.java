package com.api.JobPortalApi.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.api.JobPortalApi.entities.User;

public interface UserRepo extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
