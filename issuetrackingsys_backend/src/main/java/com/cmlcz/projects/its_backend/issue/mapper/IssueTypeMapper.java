package com.cmlcz.projects.its_backend.issue.mapper;

import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeRequestDTO;
import com.cmlcz.projects.its_backend.issue.model.IssueType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IssueTypeMapper {

    IssueTypeDTO toDTO(IssueType issueType);
    List<IssueTypeDTO> toDTOs(List<IssueType> issueTypes);
    IssueType toEntity(IssueTypeRequestDTO issueTypeRequestDTO);

    void updateFromDto(IssueTypeRequestDTO issueTypeRequestDTO, @MappingTarget IssueType issueType);

}
