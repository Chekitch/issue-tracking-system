package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRequest;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;

import java.util.List;
import java.util.UUID;

public interface UserService extends BaseService<CreateUserRequest, UserSummaryDTO, UUID> {

    UserSummaryDTO getUserById(UUID id);
    UserSummaryDTO create(CreateUserRequest requestDTO);
    List<UserSummaryDTO> getAllUsers();
}
