package com.cmlcz.projects.its_backend.user.repository;


import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findById(Long id);

    @EntityGraph(attributePaths = "permissions")
    Optional<UserRole> findWithPermissionsById(@Param("id") Long id);
    List<UserRole> findAllByOrderByCreationDateAsc();
    boolean existsByRole(String role);

}
