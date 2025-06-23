package com.cmlcz.projects.its_backend.user.repository;

import com.cmlcz.projects.its_backend.user.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {
    Optional<UserPermission> findByName(String name);
}
