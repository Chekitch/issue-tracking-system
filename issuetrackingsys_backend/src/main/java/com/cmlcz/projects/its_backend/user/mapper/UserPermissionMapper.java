package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.user.dto.CreateUserPermissionRequest;
import com.cmlcz.projects.its_backend.user.dto.UserPermissionResponse;
import com.cmlcz.projects.its_backend.user.model.UserPermission;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserPermissionMapper {

    UserPermission toEntity(CreateUserPermissionRequest userPermissionRequest);

    UserPermissionResponse toDto(UserPermission userPermission);

    List<UserPermissionResponse> toDtos(List<UserPermission> userPermissions);

}
