package com.cmlcz.projects.its_backend.issue.dto.IssueType;

import jakarta.validation.constraints.NotBlank;

public record IssueTypeRequestDTO(

        @NotBlank
        String name,

        @NotBlank
        String description
) {
}
