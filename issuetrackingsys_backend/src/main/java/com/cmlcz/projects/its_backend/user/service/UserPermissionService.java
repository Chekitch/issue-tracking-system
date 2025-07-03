package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.user.dto.userPermission.CreateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UpdateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;

import java.util.List;

public interface UserPermissionService {
    UserPermissionDTO createPermission(CreateUserPermissionDTO userPermissionRequest);
    List<UserPermissionDTO> getAllPermissions();
    UserPermissionDTO getById(Long id);
    UserPermissionDTO update(UpdateUserPermissionDTO updateUserPermissionDTO, Long id);
    void delete(Long id);
}
