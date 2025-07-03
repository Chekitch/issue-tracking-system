package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.user.dto.userPermission.CreateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserPermissionMapper {

    UserPermission toEntity(CreateUserPermissionDTO userPermissionRequest);

    UserPermissionDTO toDto(UserPermission userPermission);

    List<UserPermissionDTO> toDtos(List<UserPermission> userPermissions);

}
