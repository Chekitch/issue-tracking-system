package com.cmlcz.projects.its_backend.issue.dto.IssueActivity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record IssueActivityCreateDTO(

        @NotBlank
        @Size(max = 255, message = "Size must be at most 255 characters")
        String description,

        @NotNull
        UUID performed_by_id
) {
}
