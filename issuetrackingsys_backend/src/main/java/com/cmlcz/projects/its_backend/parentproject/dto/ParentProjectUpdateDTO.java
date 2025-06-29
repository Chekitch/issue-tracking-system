package com.cmlcz.projects.its_backend.parentproject.dto;

import jakarta.validation.constraints.NotBlank;

public record ParentProjectUpdateDTO(
        @NotBlank(message = "Project name must not be blank") String projectName,
        @NotBlank(message = "Description must not be blank") String description
){

}


