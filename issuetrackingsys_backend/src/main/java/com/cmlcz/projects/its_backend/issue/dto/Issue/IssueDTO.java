package com.cmlcz.projects.its_backend.issue.dto.Issue;

import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UserSummaryDTO;

import java.util.UUID;

public record IssueDTO(
        UUID id,
        String title,
        String description,
        IssueTypeDTO issueType,
        IssueStatusDTO issueStatus,
        IssuePriorityDTO issuePriority,
        UserSummaryDTO reporter,
        UserSummaryDTO assignee
) {
}
