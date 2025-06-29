package com.cmlcz.projects.its_backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserPermissionRequest {

    @NotBlank(message = "Permission name is required")
    @Size(max = 50, message = "Permission name must be at most 50 characters")
    private String name;

    @Size(max = 127, message = "Description must be at most 127 characters")
    private String description;
}
