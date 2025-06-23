package com.cmlcz.projects.its_backend.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CommentRequestDTO {

    @NotBlank(message = "Content must not be blank")
    private String content;

    @NotNull(message = "User ID must not be null")
    private UUID userId;

    @NotNull(message = "Issue ID must not be null")
    private UUID issueId;

}
