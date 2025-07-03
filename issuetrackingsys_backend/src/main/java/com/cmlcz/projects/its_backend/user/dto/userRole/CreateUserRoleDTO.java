package com.cmlcz.projects.its_backend.user.dto.userRole;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserRoleDTO(
        @NotBlank(message = "Role must not be blank")
        @Size(min = 3, max = 30, message = "Role must be between 3 and 30 characters")
        String role,

        @NotBlank(message = "Description must not be blank")
        @Size(max = 100, message = "Description must be at most 100 characters")
        String description
) {

}
