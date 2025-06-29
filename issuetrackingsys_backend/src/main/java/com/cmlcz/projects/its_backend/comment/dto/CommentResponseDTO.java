package com.cmlcz.projects.its_backend.comment.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentResponseDTO(
        Long id,
        String content,
        LocalDateTime createdAt,

        UUID authorId,
        String authorUsername
) {
    
}
