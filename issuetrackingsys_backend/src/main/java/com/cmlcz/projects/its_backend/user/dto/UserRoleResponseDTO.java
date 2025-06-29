package com.cmlcz.projects.its_backend.user.dto;


import java.util.Set;

public record UserRoleResponseDTO(
        Long id,
        String role,
        String description,
        Set<UserPermissionResponse> permissions
){

}
