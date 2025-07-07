package com.cmlcz.projects.its_backend.issue.dto.IssueActivity;

import jakarta.validation.constraints.NotBlank;

public record IssueActivityUpdateDTO(
        @NotBlank
        String description
) {
}
