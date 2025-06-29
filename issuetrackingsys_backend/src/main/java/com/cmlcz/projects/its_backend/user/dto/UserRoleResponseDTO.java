package com.cmlcz.projects.its_backend.user.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserRoleResponseDTO {

    private Long id;
    private String role;
    private String description;
    private Set<UserPermissionResponse> permissions;
}
