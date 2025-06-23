package com.cmlcz.projects.its_backend.user.repository;


import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findById(Long id);
}
