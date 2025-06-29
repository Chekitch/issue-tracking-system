package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.user.dto.CreateUserPermissionRequest;
import com.cmlcz.projects.its_backend.user.dto.UserPermissionResponse;
import com.cmlcz.projects.its_backend.user.mapper.UserPermissionMapper;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import com.cmlcz.projects.its_backend.user.repository.UserPermissionRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.cmlcz.projects.its_backend.user.service.UserPermissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserPermissionServiceImpl implements UserPermissionService {

    private final UserRoleRepository userRoleRepository;
    private final UserPermissionRepository userPermissionRepository;
    private final UserPermissionMapper userPermissionMapper;

    public UserPermissionServiceImpl(UserPermissionRepository userPermissionRepository, UserPermissionMapper userPermissionMapper, UserRoleRepository userRoleRepository){
        this.userPermissionRepository = userPermissionRepository;
        this.userPermissionMapper = userPermissionMapper;
        this.userRoleRepository = userRoleRepository;
    }

    @Transactional
    @Override
    public UserPermissionResponse createPermission(CreateUserPermissionRequest userPermissionRequest) {

        if(userPermissionRepository.findByName(userPermissionRequest.getName()).isPresent()){
            throw new ResourceAlreadyExistsException("Permission exists");
        }

        UserPermission userPermission = userPermissionMapper.toEntity(userPermissionRequest);

        userPermissionRepository.save(userPermission);

        return userPermissionMapper.toDto(userPermission);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPermissionResponse> getAllPermissions() {

       List<UserPermission> userPermissions = userPermissionRepository.findAll();

       return userPermissionMapper.toDtos(userPermissions);
    }

    @Override
    public UserPermissionResponse getById(Long id) {
        UserPermission userPermission = userPermissionRepository.getReferenceById(id);

        return userPermissionMapper.toDto(userPermission);
    }
}
