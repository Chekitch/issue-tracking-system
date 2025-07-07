package com.cmlcz.projects.its_backend.issue.service;

import com.cmlcz.projects.its_backend.common.service.BaseService;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityRequestDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface IssuePriorityService extends BaseService<IssuePriorityRequestDTO, IssuePriorityDTO, Long> {

    List<IssuePriorityDTO> getAllIssuePriorities();
    IssuePriorityDTO createIssuePriority(IssuePriorityRequestDTO issuePriorityRequestDTO);
    IssuePriorityDTO updateIssuePriority(IssuePriorityRequestDTO issuePriorityRequestDTO, Long id);
    void deleteIssuePriority(Long id);
    IssuePriorityDTO getIssuePriorityById(Long id);
}
