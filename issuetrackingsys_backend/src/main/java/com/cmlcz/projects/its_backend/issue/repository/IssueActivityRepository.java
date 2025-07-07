package com.cmlcz.projects.its_backend.issue.repository;

import com.cmlcz.projects.its_backend.issue.model.IssueActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IssueActivityRepository extends JpaRepository<IssueActivity, Long> {

    List<IssueActivity> getIssueActivitiesByIssueIdOrderByCreationDateAsc(UUID issueId);
    Optional<IssueActivity> getIssueActivityByIdAndIssueId(Long id, UUID issue_id);

}
