package com.cmlcz.projects.its_backend.issue.mapper;

import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusRequestDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusDTO;
import com.cmlcz.projects.its_backend.issue.model.IssueStatus;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IssueStatusMapper {

    IssueStatusDTO toDto(IssueStatus issueStatus);
    List<IssueStatusDTO> toDtos(List<IssueStatus> issueStatus);
    IssueStatus toEntity(IssueStatusRequestDTO issueStatusRequestDTO);

    void updateFromDto(IssueStatusRequestDTO issueStatusRequestDTO, @MappingTarget IssueStatus issueStatus);
}
