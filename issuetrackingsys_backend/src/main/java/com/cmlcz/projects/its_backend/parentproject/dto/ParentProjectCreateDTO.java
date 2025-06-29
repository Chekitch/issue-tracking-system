package com.cmlcz.projects.its_backend.parentproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ParentProjectCreateDTO(
        @NotBlank(message = "Project name must not be blank") String projectName,
        @NotBlank(message = "Description must not be blank") String description,
        @NotNull(message = "CreatedById must not be null") UUID createdById
){

}