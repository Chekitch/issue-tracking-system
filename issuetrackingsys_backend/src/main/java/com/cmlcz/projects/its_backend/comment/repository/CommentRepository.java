package com.cmlcz.projects.its_backend.comment.repository;

import com.cmlcz.projects.its_backend.comment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> getCommentsByIssueIdOrderByCreationDateDesc(UUID issueId);
}
