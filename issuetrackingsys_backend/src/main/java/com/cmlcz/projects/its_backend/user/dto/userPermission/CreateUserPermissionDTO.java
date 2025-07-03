package com.cmlcz.projects.its_backend.user.dto.userPermission;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserPermissionDTO(
        @NotBlank(message = "Permission name is required")
        @Size(max = 50, message = "Permission name must be at most 50 characters")
        String name,

        @Size(max = 127, message = "Description must be at most 127 characters")
        String description

) {
}
