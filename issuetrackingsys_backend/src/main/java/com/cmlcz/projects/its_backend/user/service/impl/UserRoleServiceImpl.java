package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.mapper.UserRoleMapper;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.repository.UserPermissionRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.cmlcz.projects.its_backend.user.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    private final UserPermissionRepository userPermissionRepository;
    private UserRoleRepository userRoleRepository;
    private UserRoleMapper userRoleMapper;

    @Autowired
    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, UserRoleMapper userRoleMapper, UserPermissionRepository userPermissionRepository){
        this.userRoleRepository = userRoleRepository;
        this.userRoleMapper = userRoleMapper;
        this.userPermissionRepository = userPermissionRepository;
    }

    @Override
    public UserRoleResponseDTO create(CreateUserRoleRequest requestDTO) {
        UserRole userRole = userRoleMapper.toEntity(requestDTO);

        userRoleRepository.save(userRole);

        return userRoleMapper.toDto(userRole);
    }

    @Override
    @Transactional
    public UserRoleResponseDTO getById(long id) {
        return null;
    }

    @Override
    @Transactional
    public List<UserRoleResponseDTO> getAllRoles() {
        List<UserRole> userRoles = userRoleRepository.findAll();

        return userRoleMapper.toDTOs(userRoles);
    }

    @Transactional
    public UserRoleResponseDTO assignPermission(Long roleId, Long permissionId) {
        UserRole role = userRoleRepository.findWithPermissionsById(roleId)
                .orElseThrow( () -> new ResourceNotFoundException("Role not found"));

        UserPermission permission = userPermissionRepository.findById(permissionId)
                .orElseThrow( () -> new ResourceNotFoundException("Permission not found"));

        role.getPermissions().add(permission);
        userRoleRepository.save(role);
        return userRoleMapper.toDto(role);
    }

    @Override
    public UserRoleResponseDTO removePermission(Long roleId, Long permissionId) {
        return null;
    }
}
