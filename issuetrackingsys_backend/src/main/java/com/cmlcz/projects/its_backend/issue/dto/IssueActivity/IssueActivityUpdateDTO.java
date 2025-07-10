package com.cmlcz.projects.its_backend.issue.dto.IssueActivity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record IssueActivityUpdateDTO(
        @NotBlank
        @Size(max = 255, message = "Description must be at most 255 characters")
        String description
) {
}
