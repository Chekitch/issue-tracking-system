package com.cmlcz.projects.its_backend.comment.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentResponseDTO(
        Long id,
        LocalDateTime createdAt,
        String content,

        UUID authorId,
        String authorUsername
) {
    
}
