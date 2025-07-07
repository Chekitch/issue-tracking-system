package com.cmlcz.projects.its_backend.issue.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueDTO;
import com.cmlcz.projects.its_backend.issue.dto.Issue.IssueUpdateDTO;
import com.cmlcz.projects.its_backend.issue.mapper.IssueMapper;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.issue.service.IssueService;
import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import com.cmlcz.projects.its_backend.subproject.repository.SubProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class IssueServiceImpl implements IssueService {


    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;
    private final SubProjectRepository subProjectRepository;

    @Autowired
    public IssueServiceImpl(IssueRepository issueRepository, IssueMapper issueMapper, SubProjectRepository subProjectRepository) {
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
        this.subProjectRepository = subProjectRepository;
    }

    @Override
    public IssueDTO createIssue(UUID subId, IssueCreateDTO issueCreateDTO) {
        SubProject subProject = loadSubProjectOrFail(subId);

        Issue issue = issueMapper.toEntity(issueCreateDTO);
        issue.setSubProject(subProject);

        Issue saved = issueRepository.save(issue);
        return issueMapper.toDto(saved);
    }

    @Override
    public List<IssueDTO> getAllIssuesBySubProject(UUID subId) {
        if(!subProjectRepository.existsById(subId)) {
            throw new ResourceNotFoundException("Subproject not found");
        }
        List<Issue> issues = issueRepository.findAllBySubProjectIdOrderByCreationDateAsc(subId);

        return issues
                .stream()
                .map(issueMapper::toDto)
                .toList();
    }

    @Override
    public IssueDTO updateIssue(UUID issueId, IssueUpdateDTO issueUpdateDTO) {
        Issue issue = loadIssueOrFail(issueId);

        issueMapper.updateFromDto(issueUpdateDTO, issue);

        issueRepository.save(issue);

        return issueMapper.toDto(issue);

    }

    @Override
    public void deleteIssue(UUID issueId) {
        Issue issue = loadIssueOrFail(issueId);

        issueRepository.delete(issue);
    }

    @Override
    public IssueDTO getIssueById(UUID issueId) {
        Issue issue = loadIssueOrFail(issueId);

        return issueMapper.toDto(issue);
    }

    public SubProject loadSubProjectOrFail(UUID subId) {
        return subProjectRepository.findById(subId)
                .orElseThrow( () -> new ResourceNotFoundException("Subproject not found"));
    }

    public Issue loadIssueOrFail(UUID issueId) {
        return issueRepository.findById(issueId)
                .orElseThrow( () -> new ResourceNotFoundException("Issue not found"));
    }

}
