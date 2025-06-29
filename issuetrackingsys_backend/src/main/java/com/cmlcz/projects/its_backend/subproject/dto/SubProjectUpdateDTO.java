package com.cmlcz.projects.its_backend.subproject.dto;

import jakarta.validation.constraints.NotBlank;

public record SubProjectUpdateDTO(
    @NotBlank(message = "Project name must not be blank") String projectName,
    String description
){
}
