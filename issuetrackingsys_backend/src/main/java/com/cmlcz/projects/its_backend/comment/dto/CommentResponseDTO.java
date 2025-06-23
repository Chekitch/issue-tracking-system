package com.cmlcz.projects.its_backend.comment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CommentResponseDTO {

    private Long id;
    private String content;
    private LocalDateTime createdAt;

    private UUID authorId;
    private String authorUsername;
}
