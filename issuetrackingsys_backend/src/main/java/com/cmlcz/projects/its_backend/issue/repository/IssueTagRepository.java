package com.cmlcz.projects.its_backend.issue.repository;

import com.cmlcz.projects.its_backend.issue.model.IssueTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueTagRepository extends JpaRepository<IssueTag, Long>{
}
