package com.cmlcz.projects.its_backend.parentproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.aspectj.bridge.IMessage;

import java.util.UUID;

public record ParentProjectCreateDTO(
        @NotBlank(message = "Project name must not be blank")
        @Size(max=127, message = "Project name must be at most 127 characters")
        String projectName,
        @Size(max=255, message = "Description must be at most 255 characters")
        @NotBlank(message = "Description must not be blank") String description,
        @NotNull(message = "CreatedById must not be null") UUID createdById
){

}