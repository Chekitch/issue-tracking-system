package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRequest;
import com.cmlcz.projects.its_backend.user.dto.UpdateUserRequest;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserRoleMapper.class})
public interface UserMapper {


    UserSummaryDTO toDTO(User user);
    List<UserSummaryDTO> toDTOs(List<User> users);

    @Mapping(source = "roleId", target = "role", qualifiedByName = "mapRole")
    @Mapping(target = "hashedPassword", source = "password", qualifiedByName = "encodePassword")
    User toEntity(CreateUserRequest createUserRequest, @Context UserRoleRepository userRoleRepository,
                  @Context PasswordEncoder passwordEncoder);

    @Mapping(source = "roleId", target = "role", qualifiedByName = "mapRole")
    @Mapping(target = "hashedPassword", source = "password", qualifiedByName = "encodePassword")
    User toEntity(UpdateUserRequest updateUserRequest, @Context UserRoleRepository userRoleRepository,
                  @Context PasswordEncoder passwordEncoder);


    @Named("mapRole")
    default UserRole mapRole(Long roleId,
                             @Context UserRoleRepository userRoleRepository) {
        return userRoleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Role not found with id " + roleId));
    }

    @Named("encodePassword")
    default String encodePassword(String password,
                                  @Context PasswordEncoder passwordEncoder) {
        return passwordEncoder.encode(password);
    }
}
