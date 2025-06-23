package com.cmlcz.projects.its_backend.parentproject.repository;

import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ParentProjectRepository extends JpaRepository<ParentProject, UUID>{
    Optional<ParentProject> findById(UUID id);

    boolean existsById(UUID id);

}
