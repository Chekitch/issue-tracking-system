package com.cmlcz.projects.its_backend.issue.repository;

import com.cmlcz.projects.its_backend.issue.model.IssuePriority;
import com.cmlcz.projects.its_backend.issue.model.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IssuePriorityRepository extends JpaRepository<IssuePriority, Long> {
    boolean existsByNameIgnoreCase(String name);

    List<IssuePriority> getAllIssueStatusesByOrderByCreationDateAsc();

}
