package com.cmlcz.projects.its_backend.subproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;


public record SubProjectCreateDTO(
        @NotBlank(message = "Project name must not be blank")
        @Size(max=127, message = "Project name must be at most 127 characters")
        String projectName,

        @Size(max=255, message = "Description must be at most 255 characters")
        String description,

        @NotNull(message = "createdById is required")
        UUID createdById
){
}
