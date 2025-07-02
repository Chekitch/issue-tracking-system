package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRequest;
import com.cmlcz.projects.its_backend.user.dto.UpdateUserRequest;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

public interface UserService extends BaseService<CreateUserRequest, UserSummaryDTO, UUID> {

    UserSummaryDTO getUserById(UUID roleId);
    UserSummaryDTO create(CreateUserRequest requestDTO);
    List<UserSummaryDTO> getAllUsers();
    UserSummaryDTO updateUser(UUID roleId, UpdateUserRequest updateUserRequest);
    void deleteUser(UUID roleId);
}
