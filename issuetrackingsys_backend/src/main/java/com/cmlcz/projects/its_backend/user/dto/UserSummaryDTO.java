package com.cmlcz.projects.its_backend.user.dto;


import java.util.UUID;

public record UserSummaryDTO(
        UUID id,
        String username,
        String fullName,
        UserRoleResponseDTO role
) {
}
