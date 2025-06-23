package com.cmlcz.projects.its_backend.comment.service;

import com.cmlcz.projects.its_backend.comment.dto.CommentRequestDTO;
import com.cmlcz.projects.its_backend.comment.dto.CommentResponseDTO;
import com.cmlcz.projects.its_backend.common.service.CreatedByService;
import com.cmlcz.projects.its_backend.user.model.User;

import java.util.ArrayList;

public interface CommentService extends CreatedByService<CommentRequestDTO, CommentResponseDTO, Long, User> {
    ArrayList<CommentResponseDTO> getComments();

    CommentResponseDTO save(CommentRequestDTO commentRequestDTO);
}
