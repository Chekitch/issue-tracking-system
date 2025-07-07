package com.cmlcz.projects.its_backend.comment.service;

import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentUpdateDTO;
import com.cmlcz.projects.its_backend.common.service.CreatedByService;
import com.cmlcz.projects.its_backend.user.model.User;
import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public interface CommentService extends CreatedByService<CommentRequestDTO, CommentResponseDTO, Long, User> {
    List<CommentResponseDTO> getCommentsByIssueId(UUID issueId);
    CommentResponseDTO createComment(UUID issueId, CommentRequestDTO commentRequestDTO);
    CommentResponseDTO getCommentById(Long id);
    CommentResponseDTO updateComment(Long commentId,UUID issueId, CommentUpdateDTO commentUpdateDTO);
    void deleteComment(Long commentId, UUID issueId);
}
