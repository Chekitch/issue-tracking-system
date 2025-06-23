package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserRoleMapper {

    UserRoleResponseDTO toDto(UserRole userRole);

}
