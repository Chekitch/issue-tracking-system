package com.cmlcz.projects.its_backend.user.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record AssignPermissionsRequest(
        @NotEmpty
        Set<Long> permissionIds
) {

}
