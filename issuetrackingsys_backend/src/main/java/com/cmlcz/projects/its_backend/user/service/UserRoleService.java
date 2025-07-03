package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.CreateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UpdateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UserRoleDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;

import java.util.List;

public interface UserRoleService extends BaseService<CreateUserRoleDTO, UserRoleDTO, Long> {

    UserRoleDTO getById(long id);
    List<UserRoleDTO> getAllRoles();

    UserRoleDTO create(CreateUserRoleDTO requestDTO);
    UserRoleDTO update(Long id, UpdateUserRoleDTO updateUserRoleDTO);
    void delete(Long roleId);

    void assignPermission(Long roleId, Long permissionId);
    void removePermission(Long roleId, Long permissionId);

    UserRole loadRoleOrException(Long roleId);
    UserRole loadBaseRole();

    List<UserPermissionDTO> getPermissionsByRole(Long roleId);
}
