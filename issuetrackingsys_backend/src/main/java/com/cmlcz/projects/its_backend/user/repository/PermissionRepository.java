package com.cmlcz.projects.its_backend.user.repository;

import com.cmlcz.projects.its_backend.user.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PermissionRepository extends JpaRepository<UserPermission, Long> {
    List<UserPermission> getPermissionsById(long id);
}
