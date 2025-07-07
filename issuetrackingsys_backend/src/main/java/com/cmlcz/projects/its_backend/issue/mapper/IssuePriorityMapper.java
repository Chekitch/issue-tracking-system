package com.cmlcz.projects.its_backend.issue.mapper;

import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityRequestDTO;
import com.cmlcz.projects.its_backend.issue.model.IssuePriority;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IssuePriorityMapper {

    IssuePriorityDTO toDto(IssuePriority issuePriority);

    IssuePriority toEntity(IssuePriorityRequestDTO issuePriorityRequestDTO);

    void updateFromDto(IssuePriorityRequestDTO issuePriorityRequestDTO, @MappingTarget IssuePriority issuePriority);
}
