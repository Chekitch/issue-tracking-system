package com.cmlcz.projects.its_backend.parentproject.mapper;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectCreateDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ParentProjectMapper {

    ParentProjectResponseDTO toDto(ParentProject parent);

    @Mapping(source = "parent.createdById", target = "createdBy.id")
    ParentProject toEntity(ParentProjectCreateDTO parent);


}
