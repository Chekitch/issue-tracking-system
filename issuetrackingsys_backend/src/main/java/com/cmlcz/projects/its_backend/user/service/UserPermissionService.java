package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.user.dto.CreateUserPermissionRequest;
import com.cmlcz.projects.its_backend.user.dto.UserPermissionResponse;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import jakarta.validation.Valid;

import java.util.List;

public interface UserPermissionService {
    UserPermissionResponse createPermission(CreateUserPermissionRequest userPermissionRequest);
    List<UserPermissionResponse> getAllPermissions();
    UserPermissionResponse getById(Long id);
}
