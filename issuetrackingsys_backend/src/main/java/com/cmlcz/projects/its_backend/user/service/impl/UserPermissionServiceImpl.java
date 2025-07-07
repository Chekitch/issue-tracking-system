package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.user.dto.userPermission.CreateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UpdateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;
import com.cmlcz.projects.its_backend.user.mapper.UserPermissionMapper;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import com.cmlcz.projects.its_backend.user.model.UserRole;
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
    public UserPermissionDTO createPermission(CreateUserPermissionDTO userPermissionRequest) {

        if(userPermissionRepository.existsByNameIgnoreCase(userPermissionRequest.name())){
            throw new ResourceAlreadyExistsException("Permission already exists");
        }

        UserPermission userPermission = userPermissionMapper.toEntity(userPermissionRequest);

        userPermissionRepository.save(userPermission);

        return userPermissionMapper.toDto(userPermission);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPermissionDTO> getAllPermissions() {

       List<UserPermission> userPermissions = userPermissionRepository.findAllByOrderByCreationDateAsc();

       return userPermissionMapper.toDtos(userPermissions);
    }

    @Override
    @Transactional
    public UserPermissionDTO getById(Long id) {
        UserPermission userPermission = getPermissionOrFail(id);

        return userPermissionMapper.toDto(userPermission);
    }

    @Override
    @Transactional
    public UserPermissionDTO update(UpdateUserPermissionDTO updateUserPermissionDTO, Long id) {
        UserPermission userPermission = getPermissionOrFail(id);

        if(!userPermission.getName().equalsIgnoreCase(updateUserPermissionDTO.name()) && userPermissionRepository.existsByNameIgnoreCase(updateUserPermissionDTO.name())){
            throw new ResourceAlreadyExistsException("Permission already exists");
        }
        userPermission.setName(updateUserPermissionDTO.name());
        userPermission.setDescription(updateUserPermissionDTO.description());

        userPermissionRepository.save(userPermission);
        return userPermissionMapper.toDto(userPermission);
    }

    @Transactional
    public void delete(Long id){
        UserPermission userPermission = getPermissionOrFail(id);

        List<UserRole> roles = userRoleRepository.findAllWithPermissions();

        roles.stream()
                .filter(role -> role.getPermissions().removeIf(p -> p.getId().equals(id)))
                .forEach(userRoleRepository::save);

        userPermissionRepository.delete(userPermission);

    }

    public UserPermission getPermissionOrFail(Long id){
        return userPermissionRepository.getReferenceById(id);
    }
}
