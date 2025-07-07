package com.cmlcz.projects.its_backend.issue.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityUpdateDTO;
import com.cmlcz.projects.its_backend.issue.mapper.IssueActivityMapper;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.model.IssueActivity;
import com.cmlcz.projects.its_backend.issue.repository.IssueActivityRepository;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.issue.service.IssueActivityService;
import com.cmlcz.projects.its_backend.issue.service.IssueService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class IssueActivityServiceImpl implements IssueActivityService {

    private final IssueActivityRepository issueActivityRepository;
    private final IssueActivityMapper issueActivityMapper;
    private final IssueRepository issueRepository;
    private final IssueService issueService;

    @Autowired
    public IssueActivityServiceImpl(IssueActivityRepository issueActivityRepository, IssueActivityMapper issueActivityMapper, IssueRepository issueRepository, IssueService issueService) {
        this.issueActivityRepository = issueActivityRepository;
        this.issueActivityMapper = issueActivityMapper;
        this.issueRepository = issueRepository;
        this.issueService = issueService;
    }

    @Override
    public List<IssueActivityDTO> getIssueActivitiesByIssue(UUID issueId) {
        List<IssueActivity> issueActivities = issueActivityRepository.
                                                getIssueActivitiesByIssueIdOrderByCreationDateAsc(issueId);

        return issueActivityMapper.toDtos(issueActivities);
    }

    @Override
    public IssueActivityDTO createIssueActivity(UUID issueId, IssueActivityCreateDTO issueActivityCreateDTO) {

        Issue issue = loadIssueOrFail(issueId);
        IssueActivity issueActivity = issueActivityMapper.toEntity(issueActivityCreateDTO);

        issueActivity.setIssue(issue);
//        issue.getActivityLogs().add(issueActivity);

        issueActivityRepository.save(issueActivity);

        return issueActivityMapper.toDto(issueActivity);
    }

    @Override
    public IssueActivityDTO getIssueActivityByIdAndIssueId(Long id, UUID issueId) {

        IssueActivity issueActivity = issueActivityRepository.getIssueActivityByIdAndIssueId(id, issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found for this issue"));
        return issueActivityMapper.toDto(issueActivity);
    }

    @Override
    public IssueActivityDTO updateIssueActivity(Long id, UUID issueId, IssueActivityUpdateDTO issueActivityUpdateDTO) {
        IssueActivity issueActivity = loadIssueActivityOrFail(id);
        Issue issue = loadIssueOrFail(issueId);

//        issue.getActivityLogs().remove(issueActivity);
        issueActivityMapper.updateFromDto(issueActivityUpdateDTO, issueActivity);
//        issue.getActivityLogs().add(issueActivity);

        issueActivityRepository.save(issueActivity);

        return issueActivityMapper.toDto(issueActivity);
    }

    @Override
    public void deleteIssueActivity(Long id, UUID issueId) {
        Issue issue = loadIssueOrFail(issueId);
        IssueActivity issueActivity = loadIssueActivityOrFail(id);

        //issue.getActivityLogs().remove(issueActivity);
//        issueActivityRepository.delete(issueActivity);
    }


    public Issue loadIssueOrFail(UUID issueId) {
        return issueRepository.findById(issueId).orElseThrow(()-> new EntityNotFoundException("Issue not found"));
    }
    public IssueActivity loadIssueActivityOrFail(Long id){
        return issueActivityRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Issue activity not found"));
    }
}
