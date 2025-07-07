package com.cmlcz.projects.its_backend.issue.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusRequestDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusDTO;

import java.util.List;

public interface IssueStatusService extends BaseService<IssueStatusRequestDTO, IssueStatusDTO, Long> {
    List<IssueStatusDTO> getAllIssueStatuses();

    IssueStatusDTO getIssueStatusById(Long id);

    IssueStatusDTO createIssueStatus(IssueStatusRequestDTO issueStatusRequestDTO);

    IssueStatusDTO updateIssueStatus(Long id, IssueStatusRequestDTO issueStatusRequestDTO);

    void deleteIssueStatus(Long id);
}
