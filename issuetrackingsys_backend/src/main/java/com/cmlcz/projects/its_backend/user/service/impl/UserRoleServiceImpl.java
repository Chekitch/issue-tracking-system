package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UpdateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.mapper.UserRoleMapper;
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

    @Autowired
    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, UserRoleMapper userRoleMapper, UserPermissionRepository userPermissionRepository, UserRepository userRepository){
        this.userRoleRepository = userRoleRepository;
        this.userRoleMapper = userRoleMapper;
        this.userPermissionRepository = userPermissionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public UserRoleResponseDTO create(CreateUserRoleRequest requestDTO) {
        if(userRoleRepository.existsByRole(requestDTO.role())){
            throw new ResourceAlreadyExistsException("This role already exists");
        }

        UserRole userRole = userRoleMapper.toEntity(requestDTO);
        userRoleRepository.save(userRole);

        return userRoleMapper.toDto(userRole);
    }

    @Override
    public UserRoleResponseDTO getById(long id) {
        return null;
    }

    @Override
    public List<UserRoleResponseDTO> getAllRoles() {
        List<UserRole> userRoles = userRoleRepository.findAllByOrderByCreationDateAsc();

        return userRoleMapper.toDTOs(userRoles);
    }

    public UserRoleResponseDTO assignPermission(Long roleId, Long permissionId) {
        UserRole role = loadRoleOrException(roleId);

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
    public UserRoleResponseDTO update(Long roleId, UpdateUserRoleRequest updateUserRoleRequest) {

        UserRole userRole = loadRoleOrException(roleId);

        if(userRoleRepository.existsByRole(updateUserRoleRequest.role())){
            throw new ResourceAlreadyExistsException("This role already exists");
        }

        userRole.setRole(updateUserRoleRequest.role());
        userRole.setDescription(updateUserRoleRequest.description());
        userRoleRepository.save(userRole);

        return userRoleMapper.toDto(userRole);
    }


    public UserRole loadRoleOrException(Long id){
        return userRoleRepository.findWithPermissionsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + id));
    }

    public UserRole loadBaseRole(){
        return userRoleRepository.findById(0L)
                .orElseThrow(() -> new IllegalStateException("Base role missing"));
    }
}
