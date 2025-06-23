package com.cmlcz.projects.its_backend.subproject.repository;

import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubProjectRepository extends JpaRepository<SubProject, UUID> {
    List<SubProject> findAllByParentProjectId(UUID parentId);
}
