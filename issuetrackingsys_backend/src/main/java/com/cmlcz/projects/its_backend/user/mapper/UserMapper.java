package com.cmlcz.projects.its_backend.user.mapper;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.dto.user.CommentUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.CreateUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UpdateUserDTO;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.dto.user.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.fasterxml.jackson.datatype.jsr310.ser.YearSerializer;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring", uses = {UserRoleMapper.class})
public interface UserMapper {


    UserSummaryDTO toDTO(User user);
    CommentUserDTO toCommentDTO(User user);

    @Mapping(source = "roleId", target = "role", qualifiedByName = "mapRole")
    @Mapping(target = "hashedPassword", source = "password", qualifiedByName = "encodePassword")
    User toEntity(CreateUserDTO createUserDTO, @Context UserRoleRepository userRoleRepository,
                         @Context PasswordEncoder passwordEncoder);

    @Mapping(source = "roleId", target = "role", qualifiedByName = "mapRole")
    @Mapping(target = "hashedPassword", source = "password", qualifiedByName = "encodePassword")
    User toEntity(UpdateUserDTO updateUserDTO, @Context UserRoleRepository userRoleRepository,
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
