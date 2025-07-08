package com.cmlcz.projects.its_backend.user.dto.user;

import java.util.UUID;

public record CommentUserDTO(
        UUID id,
        String username
) {
}
