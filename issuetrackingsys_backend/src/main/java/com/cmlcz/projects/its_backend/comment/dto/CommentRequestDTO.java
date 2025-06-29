package com.cmlcz.projects.its_backend.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CommentRequestDTO(
        @NotBlank(message = "Content must not be blank")
        String content,
        @NotNull(message = "User ID must not be null")
        UUID userId,
        @NotNull(message = "Issue ID must not be null")
        UUID issueId
) {

}
