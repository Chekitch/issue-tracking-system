package com.cmlcz.projects.its_backend.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank String username,@NotBlank String password) {
}
