package com.cmlcz.projects.its_backend.comment.dto;

import jakarta.validation.constraints.NotBlank;

public record CommentUpdateDTO(
        @NotBlank(message = "Content must not be blank")
        String content
) {
}
