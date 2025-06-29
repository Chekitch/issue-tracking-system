package com.cmlcz.projects.its_backend.subproject.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SubProjectUpdateDTO {

    @NotBlank(message = "Project name must not be blank")
    private String projectName;

    private String description;

}
