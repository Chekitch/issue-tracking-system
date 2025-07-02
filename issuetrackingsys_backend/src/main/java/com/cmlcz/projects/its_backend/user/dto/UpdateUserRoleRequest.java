package com.cmlcz.projects.its_backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserRoleRequest(
        @NotBlank(message = "Role must not be blank")
        String role,

        @NotBlank(message = "Description must not be blank")
        @Size(max = 100, message = "Description must be at most 100 characters")
        String description
) {
}
