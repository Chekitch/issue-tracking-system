package com.cmlcz.projects.its_backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRoleRequestDTO {

    @NotBlank(message = "Role must not be blank")
    @Size(min = 3, max = 30, message = "Role must be between 3 and 30 characters")
    String role;

    @NotBlank(message = "Description must not be blank")
    @Size(max = 100, message = "Description must be at most 100 characters")
    String description;

}
