package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.UserRoleRequestDTO;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;

public interface UserRoleService extends BaseService<UserRoleRequestDTO, UserRoleResponseDTO, Long> {
    UserRoleResponseDTO create(UserRoleRequestDTO requestDTO);
    UserRoleResponseDTO update(UserRoleRequestDTO requestDTO);
    UserRoleResponseDTO delete(UserRoleRequestDTO requestDTO);
    UserRoleResponseDTO getById(long id);
}
