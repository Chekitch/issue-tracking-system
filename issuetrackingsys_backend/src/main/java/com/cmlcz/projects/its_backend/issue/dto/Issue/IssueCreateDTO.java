package com.cmlcz.projects.its_backend.issue.dto.Issue;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record IssueCreateDTO(
        @NotBlank
        @Size(max = 255, message = "Title must be at most 255 characters")
        String title,

        @NotBlank
        @Size(max = 1000, message = "Description must be at most 1000 characters")
        String description,

        @NotNull
        @Positive
        Long statusId,

        @NotNull
        @Positive
        Long priorityId,

        @NotNull
        @Positive
        Long typeId,

        @NotNull
        UUID reporterId,

        UUID assigneeId
) {
}
