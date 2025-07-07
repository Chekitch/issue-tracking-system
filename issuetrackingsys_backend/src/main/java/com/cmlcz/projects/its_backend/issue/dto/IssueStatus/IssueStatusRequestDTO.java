package com.cmlcz.projects.its_backend.issue.dto.IssueStatus;

import jakarta.validation.constraints.NotBlank;

public record IssueStatusRequestDTO(

        @NotBlank
        String name,

        @NotBlank
        String description
) {
}
