package com.cmlcz.projects.its_backend.issue.repository;

import com.cmlcz.projects.its_backend.issue.model.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueStatusRepository extends JpaRepository<IssueStatus, Long> {
    boolean existsByNameIgnoreCase(String name);

    List<IssueStatus> getAllIssueStatusesByOrderByCreationDateAsc();
}
