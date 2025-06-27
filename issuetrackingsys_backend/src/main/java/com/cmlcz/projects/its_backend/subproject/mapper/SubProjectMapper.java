package com.cmlcz.projects.its_backend.subproject.mapper;


import com.cmlcz.projects.its_backend.subproject.dto.SubProjectRequestDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface SubProjectMapper {

    @Mapping(source = "createdById", target = "createdBy.id")
    @Mapping(source = "parentId", target = "parentProject.id")
    SubProject toEntity(SubProjectRequestDTO subProjectRequestDTO);


    SubProjectResponseDTO toDto(SubProject subProject);
}
