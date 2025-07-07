package com.cmlcz.projects.its_backend.user.repository;


import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    @EntityGraph(attributePaths = "permissions")
    Optional<UserRole> findWithPermissionsById(@Param("id") Long id);
    List<UserRole> findAllByOrderByCreationDateAsc();
    List<UserRole> findByPermissionsId(Long id);

    @Query("select r from UserRole r left join fetch r.permissions")
    List<UserRole> findAllWithPermissions();

    @Query("select r from UserRole r left join fetch r.permissions where r.id = :id")
    UserRole findWithPermissions(@Param("id") Long id);

    boolean existsByRoleIgnoreCase(String role);

}
