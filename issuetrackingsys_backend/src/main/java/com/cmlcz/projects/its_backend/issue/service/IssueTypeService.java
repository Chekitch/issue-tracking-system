package com.cmlcz.projects.its_backend.issue.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeRequestDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface IssueTypeService extends BaseService<IssueTypeRequestDTO, IssueTypeDTO, Long> {

    List<IssueTypeDTO> getAllIssueTypes();
    IssueTypeDTO createIssueType(IssueTypeRequestDTO issueTypeRequestDTO);
    IssueTypeDTO getIssueTypeById(Long id);
    IssueTypeDTO update(Long id, IssueTypeRequestDTO issueTypeRequestDTO);
    void deleteIssueType(Long id);
}
