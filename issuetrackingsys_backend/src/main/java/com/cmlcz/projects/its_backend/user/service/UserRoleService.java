package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;

import java.util.List;
import java.util.Set;

public interface UserRoleService extends BaseService<CreateUserRoleRequest, UserRoleResponseDTO, Long> {
    UserRoleResponseDTO create(CreateUserRoleRequest requestDTO);
    UserRoleResponseDTO getById(long id);
    List<UserRoleResponseDTO> getAllRoles();
    UserRoleResponseDTO assignPermission(Long roleId, Long permissionId);
    UserRoleResponseDTO removePermission(Long roleId, Long permissionId);
}
