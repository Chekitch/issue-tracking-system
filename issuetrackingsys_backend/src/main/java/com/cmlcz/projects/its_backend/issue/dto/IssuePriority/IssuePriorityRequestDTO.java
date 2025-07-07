package com.cmlcz.projects.its_backend.issue.dto.IssuePriority;

import jakarta.validation.constraints.NotBlank;

public record IssuePriorityRequestDTO(

        @NotBlank()
        String name,

        @NotBlank()
        String description,

        @NotBlank()
        String color
) {
}
