package com.cmlcz.projects.its_backend.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CommentRequestDTO(
        @NotBlank(message = "Content must not be blank")
        @Size(max = 255, message = "Comment must be at most 255 characters")
        String content,
        @NotNull(message = "User ID must not be null")
        UUID userId
) {

}
