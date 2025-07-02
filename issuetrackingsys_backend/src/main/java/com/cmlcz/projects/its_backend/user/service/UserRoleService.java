package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UpdateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Set;

public interface UserRoleService extends BaseService<CreateUserRoleRequest, UserRoleResponseDTO, Long> {

    UserRoleResponseDTO getById(long id);
    List<UserRoleResponseDTO> getAllRoles();

    UserRoleResponseDTO create(CreateUserRoleRequest requestDTO);
    UserRoleResponseDTO update(Long id,UpdateUserRoleRequest updateUserRoleRequest);
    void delete(Long roleId);

    UserRoleResponseDTO assignPermission(Long roleId, Long permissionId);
    UserRoleResponseDTO removePermission(Long roleId, Long permissionId);

    UserRole loadRoleOrException(Long roleId);
    UserRole loadBaseRole();
}
