package com.cmlcz.projects.its_backend.issue.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface IssueActivityService extends BaseService<IssueActivityCreateDTO, IssueActivityDTO, Long> {
    List<IssueActivityDTO> getIssueActivitiesByIssue(UUID issueId);

    IssueActivityDTO createIssueActivity(UUID issueId, IssueActivityCreateDTO issueActivityCreateDTO);

    IssueActivityDTO getIssueActivityByIdAndIssueId(Long id, UUID issueId);

    IssueActivityDTO updateIssueActivity(Long id, UUID issueId, IssueActivityUpdateDTO issueActivityUpdateDTO);

    void deleteIssueActivity(Long id, UUID issueId);
}
