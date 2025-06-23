package com.cmlcz.projects.its_backend.user.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.dto.UserCreateRequestDTO;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;

import java.util.UUID;

public interface UserService extends BaseService<UserCreateRequestDTO, UserSummaryDTO, UUID> {

    User findById(UUID createdByUserId);
    UserSummaryDTO create(UserCreateRequestDTO requestDTO);
}
