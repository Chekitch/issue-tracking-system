package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.CreateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UpdateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UserRoleDTO;
import com.cmlcz.projects.its_backend.user.mapper.UserPermissionMapper;
import com.cmlcz.projects.its_backend.user.mapper.UserRoleMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.repository.UserPermissionRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.cmlcz.projects.its_backend.user.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class UserRoleServiceImpl implements UserRoleService {

    private final UserPermissionRepository userPermissionRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserRoleMapper userRoleMapper;
    private final UserRepository userRepository;
    private final UserPermissionMapper userPermissionMapper;

    @Autowired
    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, UserRoleMapper userRoleMapper, UserPermissionRepository userPermissionRepository, UserRepository userRepository, UserPermissionMapper userPermissionMapper){
        this.userRoleRepository = userRoleRepository;
        this.userRoleMapper = userRoleMapper;
        this.userPermissionRepository = userPermissionRepository;
        this.userRepository = userRepository;
        this.userPermissionMapper = userPermissionMapper;
    }

    @Override
    public List<UserRoleDTO> getAllRoles() {
        List<UserRole> userRoles = userRoleRepository.findAllByOrderByCreationDateAsc();

        return userRoles
                .stream()
                .map(userRoleMapper::toDto)
                .toList();
    }

    @Override
    public UserRoleDTO create(CreateUserRoleDTO requestDTO) {
        if(userRoleRepository.existsByRoleIgnoreCase(requestDTO.role())){
            throw new ResourceAlreadyExistsException("This role already exists");
        }

        UserRole userRole = userRoleMapper.toEntity(requestDTO);
        userRoleRepository.save(userRole);

        return userRoleMapper.toDto(userRole);
    }

    @Override
    public UserRoleDTO getById(long id) {
        UserRole userRole = loadRoleOrException(id);
        return userRoleMapper.toDto(userRole);
    }

    @Override
    public void assignPermission(Long roleId, Long permissionId) {
        UserRole role = loadRoleOrException(roleId);

        UserPermission permission = userPermissionRepository.findById(permissionId)
                .orElseThrow( () -> new ResourceNotFoundException("Permission not found"));

        if(role.getPermissions().contains(permission)){
            throw new ResourceAlreadyExistsException("This permission is already assigned");
        }

        role.getPermissions().add(permission);
        userRoleRepository.save(role);
    }

    @Override
    public void removePermission(Long roleId, Long permissionId) {
        UserRole role = loadRoleOrException(roleId);

        UserPermission permission = userPermissionRepository.findById(permissionId)
                .orElseThrow( () -> new ResourceNotFoundException("Permission not found"));

        if(!role.getPermissions().contains(permission)){
            throw new ResourceNotFoundException("This permission is not assigned");
        }

        role.getPermissions().remove(permission);
        userRoleRepository.save(role);

    }

    @Override
    public void delete(Long roleId) {

        if(roleId == 0L){
            throw new IllegalArgumentException("You can't delete base role");
        }
        UserRole toDelete = loadRoleOrException(roleId);
        UserRole baseRole = loadBaseRole();

        userRepository.reassignUsers(toDelete, baseRole);

        userRoleRepository.delete(toDelete);
    }

    @Override
    public UserRoleDTO update(Long roleId, UpdateUserRoleDTO updateUserRoleDTO) {

        UserRole userRole = loadRoleOrException(roleId);

        if(!userRole.getRole().equalsIgnoreCase(updateUserRoleDTO.role()) && userRoleRepository.existsByRoleIgnoreCase(updateUserRoleDTO.role())){
            throw new ResourceAlreadyExistsException("This role already exists");
        }

        userRoleMapper.mapFromDto(updateUserRoleDTO, userRole);

        return userRoleMapper.toDto(userRole);
    }


    public UserRole loadRoleOrException(Long id){
        return userRoleRepository.findWithPermissionsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
    }

    public UserRole loadBaseRole(){
        return userRoleRepository.findById(0L)
                .orElseThrow(() -> new IllegalStateException("Base role missing"));
    }

    @Override
    public List<UserPermissionDTO> getPermissionsByRole(Long roleId) {
        UserRole userRole = userRoleRepository.findWithPermissionsById(roleId).orElseThrow(
                () -> new ResourceNotFoundException("No User Role with that id")
        );
        return userRole.getPermissions().stream().map(userPermissionMapper::toDto).toList();
    }
}
