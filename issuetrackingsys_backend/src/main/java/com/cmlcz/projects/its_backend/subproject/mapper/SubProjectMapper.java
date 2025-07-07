package com.cmlcz.projects.its_backend.subproject.mapper;


import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.parentproject.repository.ParentProjectRepository;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectCreateDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectUpdateDTO;
import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public abstract class SubProjectMapper {

    @Autowired private UserRepository userRepository;
    @Autowired private ParentProjectRepository parentProjectRepository;

    @Mapping(source = "subProjectCreateDTO.createdById", target = "createdBy", qualifiedByName = "mapUser")
    public abstract SubProject toEntity(SubProjectCreateDTO subProjectCreateDTO, UUID parentId);

    public abstract SubProjectResponseDTO toDto(SubProject subProject);

    public abstract void updateFromDto(SubProjectUpdateDTO subProjectUpdateDTO, @MappingTarget SubProject subProject);

    @Named("mapUser")
    public User mapUser(UUID id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));
    }




}
