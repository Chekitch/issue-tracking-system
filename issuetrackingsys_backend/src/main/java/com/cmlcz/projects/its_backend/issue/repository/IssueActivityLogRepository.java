package com.cmlcz.projects.its_backend.issue.repository;

import com.cmlcz.projects.its_backend.issue.model.IssueActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IssueActivityLogRepository extends JpaRepository<IssueActivityLog, UUID> {
}
