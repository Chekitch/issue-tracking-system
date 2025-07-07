package com.cmlcz.projects.its_backend.issue.dto.IssueActivity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record IssueActivityCreateDTO(

        @NotBlank
        String description,

        @NotNull
        UUID performed_by_id
) {
}
