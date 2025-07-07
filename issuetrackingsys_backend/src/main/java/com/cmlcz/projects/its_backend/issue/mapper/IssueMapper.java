package com.cmlcz.projects.its_backend.issue.mapper;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueUpdateDTO;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.model.IssuePriority;
import com.cmlcz.projects.its_backend.issue.model.IssueStatus;
import com.cmlcz.projects.its_backend.issue.model.IssueType;
import com.cmlcz.projects.its_backend.issue.repository.IssuePriorityRepository;
import com.cmlcz.projects.its_backend.issue.repository.IssueStatusRepository;
import com.cmlcz.projects.its_backend.issue.repository.IssueTypeRepository;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class IssueMapper {

    @Autowired
    private IssueStatusRepository issueStatusRepository;
    @Autowired
    private IssuePriorityRepository issuePriorityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueTypeRepository issueTypeRepository;


    public abstract IssueDTO toDto(Issue issue);

    public abstract List<IssueDTO> toDtos(List<Issue> issues);

    @Mapping(source = "statusId", target = "issueStatus", qualifiedByName = "mapIssueStatus")
    @Mapping(source = "priorityId", target = "issuePriority", qualifiedByName = "mapIssuePriority")
    @Mapping(source = "typeId", target = "issueType", qualifiedByName = "mapIssueType")
    @Mapping(source = "reporterId", target = "reporter", qualifiedByName = "mapUser")
    @Mapping(source = "assigneeId", target = "assignee", qualifiedByName = "mapUser")
    public abstract Issue toEntity(IssueCreateDTO issueCreateDTO);

    @Mapping(source = "statusId", target = "issueStatus", qualifiedByName = "mapIssueStatus")
    @Mapping(source = "priorityId", target = "issuePriority", qualifiedByName = "mapIssuePriority")
    @Mapping(source = "typeId", target = "issueType", qualifiedByName = "mapIssueType")
    @Mapping(source = "assigneeId", target = "assignee", qualifiedByName = "mapUser")
    public abstract void updateFromDto(IssueUpdateDTO issueUpdateDTO, @MappingTarget Issue issue);

    @Named("mapIssueStatus")
    protected IssueStatus mapIssueStatus(Long id) {
        return issueStatusRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue status not found"));
    }

    @Named("mapIssuePriority")
    protected IssuePriority mapIssuePriority(Long id) {
        return issuePriorityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue priority not found: " + id));
    }

    @Named("mapIssueType")
    protected IssueType mapIssueType(Long id) {
        return issueTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue type not found: " + id));
    }

    @Named("mapUser")
    protected User mapUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }
}
