package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.user.dto.CreateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserPermissionMapper.class})
public interface UserRoleMapper {

    UserRoleResponseDTO toDto(UserRole userRole);
    List<UserRoleResponseDTO> toDTOs(List<UserRole> userRoles);

    UserRole toEntity(CreateUserRoleRequest userRoleRequest);
}
