package com.cmlcz.projects.its_backend.subproject.mapper;


import com.cmlcz.projects.its_backend.subproject.dto.SubProjectCreateDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface SubProjectMapper {

    @Mapping(source = "subProjectCreateDTO.createdById", target = "createdBy.id")
    @Mapping(source = "parentId", target = "parentProject.id")
    SubProject toEntity(SubProjectCreateDTO subProjectCreateDTO, UUID parentId);


    SubProjectResponseDTO toDto(SubProject subProject);
}
