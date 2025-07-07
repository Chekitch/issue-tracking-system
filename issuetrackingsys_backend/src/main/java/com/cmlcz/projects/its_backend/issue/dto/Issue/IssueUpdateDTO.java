package com.cmlcz.projects.its_backend.issue.dto.Issue;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record IssueUpdateDTO(
        @NotBlank
        String title,

        @NotBlank
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

        UUID assigneeId
){
}
