package com.cmlcz.projects.its_backend.user.dto.user;


import com.cmlcz.projects.its_backend.user.dto.userRole.UserRoleDTO;

import java.util.UUID;

public record UserSummaryDTO(
        UUID id,
        String username,
        String fullName,
        UserRoleDTO role
) {
}
