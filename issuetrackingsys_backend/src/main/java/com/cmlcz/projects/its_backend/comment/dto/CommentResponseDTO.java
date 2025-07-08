package com.cmlcz.projects.its_backend.comment.dto;

import com.cmlcz.projects.its_backend.user.dto.user.CommentUserDTO;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentResponseDTO(
        Long id,
        LocalDateTime createdAt,
        String content,

        CommentUserDTO author
) {
    
}
