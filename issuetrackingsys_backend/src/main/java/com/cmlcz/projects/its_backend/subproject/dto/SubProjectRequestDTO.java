package com.cmlcz.projects.its_backend.subproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;


@Data
public class SubProjectRequestDTO {


    @NotBlank(message = "Project name must not be blank")
    private String projectName;

    private String description;

    @NotNull(message = "createdById is required")
    private UUID createdById;

    @NotNull(message = "parentId is required")
    private UUID parentId;

}
