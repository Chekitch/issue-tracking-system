package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.user.CreateUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UpdateUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UserSummaryDTO;

import java.util.List;
import java.util.UUID;

public interface UserService extends BaseService<CreateUserDTO, UserSummaryDTO, UUID> {

    List<UserSummaryDTO> getAllUsers();
    UserSummaryDTO create(CreateUserDTO requestDTO);
    UserSummaryDTO getUserById(UUID roleId);
    UserSummaryDTO updateUser(UUID roleId, UpdateUserDTO updateUserDTO);
    void deleteUser(UUID roleId);
}
