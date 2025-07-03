package com.cmlcz.projects.its_backend.parentproject.mapper;

import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectCreateDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;

import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ParentProjectMapper {

    ParentProjectResponseDTO toDto(ParentProject parent);

    @Mapping(source = "parent.createdById", target = "createdBy.id")
    ParentProject toEntity(ParentProjectCreateDTO parent);


}
