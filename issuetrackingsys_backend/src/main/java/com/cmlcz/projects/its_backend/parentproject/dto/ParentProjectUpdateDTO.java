package com.cmlcz.projects.its_backend.parentproject.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ParentProjectUpdateDTO {

    @Size(min=1, max=50)
    private String projectName;

    @Size(min=1, max=255)
    private String description;
}
