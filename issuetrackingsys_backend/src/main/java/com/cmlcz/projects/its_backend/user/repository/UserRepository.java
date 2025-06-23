package com.cmlcz.projects.its_backend.user.repository;

import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsById(UUID id);


}
