package com.cmlcz.projects.its_backend.issue.service;


import com.cmlcz.projects.its_backend.common.service.CreatedByService;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueUpdateDTO;
import com.cmlcz.projects.its_backend.user.model.User;

import java.util.List;
import java.util.UUID;

public interface IssueService extends CreatedByService<IssueCreateDTO, IssueDTO, UUID, User> {

    List<IssueDTO> getAllIssuesBySubProject(UUID subId);
    IssueDTO createIssue(UUID subId, IssueCreateDTO issueCreateDTO);
    IssueDTO updateIssue(UUID issueId, IssueUpdateDTO issueUpdateDTO);
    void deleteIssue(UUID issueId);
}
