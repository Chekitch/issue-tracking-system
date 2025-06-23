package com.cmlcz.projects.its_backend.parentproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.UUID;

@Data
public class ParentProjectCreateDTO {

    @NotBlank(message = "Project name must not be blank")
    private String projectName;

    @NotBlank(message = "Description must not be blank")
    private String description;

    @NotNull(message = "CreatedById must not be null")
    private UUID createdById;
}
