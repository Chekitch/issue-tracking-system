package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.user.dto.userRole.CreateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UpdateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UserRoleDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserPermissionMapper.class})
public interface UserRoleMapper {

    UserRoleDTO toDto(UserRole userRole);
    List<UserRoleDTO> toDTOs(List<UserRole> userRoles);

    UserRole toEntity(CreateUserRoleDTO userRoleRequest);

    void mapFromDto(UpdateUserRoleDTO updateUserRoleDTO, @MappingTarget UserRole userRole);
}
