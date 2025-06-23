package com.cmlcz.projects.its_backend.issue.repository;

import com.cmlcz.projects.its_backend.issue.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IssueRepository extends JpaRepository<Issue, UUID> {
}
