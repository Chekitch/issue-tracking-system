package com.cmlcz.projects.its_backend.user.dto;


public record UserSummaryDTO(
        String username,
        UserRoleResponseDTO role
) {
}
