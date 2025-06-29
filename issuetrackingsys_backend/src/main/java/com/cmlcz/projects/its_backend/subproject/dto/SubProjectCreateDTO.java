package com.cmlcz.projects.its_backend.subproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;


public record SubProjectCreateDTO(
        @NotBlank(message = "Project name must not be blank") String projectName,
        String description,
        @NotNull(message = "createdById is required") UUID createdById
){
}
