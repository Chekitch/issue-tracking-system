package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.user.dto.UserRoleRequestDTO;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.mapper.UserRoleMapper;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.cmlcz.projects.its_backend.user.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    private UserRoleRepository userRoleRepository;
    private UserRoleMapper userRoleMapper;

    @Autowired
    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, UserRoleMapper userRoleMapper){
        this.userRoleRepository = userRoleRepository;
        this.userRoleMapper = userRoleMapper;
    }

    @Override
    public UserRoleResponseDTO create(UserRoleRequestDTO requestDTO) {
        UserRole userRole = new UserRole();
        userRole.setDescription(requestDTO.getDescription());
        userRole.setPermissions(new HashSet<>());
        userRole.setRole(requestDTO.getRole());

        userRoleRepository.save(userRole);

        return userRoleMapper.toDto(userRole);
    }

    @Override
    public UserRoleResponseDTO update(UserRoleRequestDTO requestDTO) {
        return null;
    }

    @Override
    public UserRoleResponseDTO delete(UserRoleRequestDTO requestDTO) {
        return null;
    }

    @Override
    public UserRoleResponseDTO getById(long id) {
        return null;
    }
}
