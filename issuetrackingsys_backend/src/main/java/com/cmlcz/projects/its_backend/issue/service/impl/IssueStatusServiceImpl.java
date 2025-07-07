package com.cmlcz.projects.its_backend.issue.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueStatus.IssueStatusRequestDTO;
import com.cmlcz.projects.its_backend.issue.mapper.IssueStatusMapper;
import com.cmlcz.projects.its_backend.issue.model.IssueStatus;
import com.cmlcz.projects.its_backend.issue.repository.IssueStatusRepository;
import com.cmlcz.projects.its_backend.issue.service.IssueStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class IssueStatusServiceImpl implements IssueStatusService {

    private final IssueStatusRepository issueStatusRepository;
    private final IssueStatusMapper issueStatusMapper;

    @Autowired
    public IssueStatusServiceImpl(IssueStatusRepository issueStatusRepository, IssueStatusMapper issueStatusMapper) {
        this.issueStatusRepository = issueStatusRepository;
        this.issueStatusMapper = issueStatusMapper;
    }

    @Override
    public List<IssueStatusDTO> getAllIssueStatuses() {

        List<IssueStatus> issueStatusList = issueStatusRepository.getAllIssueStatusesByOrderByCreationDateAsc();
        return issueStatusMapper.toDtos(issueStatusList);
    }

    @Override
    public IssueStatusDTO getIssueStatusById(Long id) {

        IssueStatus issueStatus = loadIssueStatusOrFail(id);
        return issueStatusMapper.toDto(issueStatus);
    }

    @Override
    public IssueStatusDTO createIssueStatus(IssueStatusRequestDTO issueStatusRequestDTO) {
        if(issueStatusRepository.existsByNameIgnoreCase(issueStatusRequestDTO.name())){
            throw new ResourceAlreadyExistsException("Issue Status already exists");
        }

        IssueStatus issueStatus = issueStatusMapper.toEntity(issueStatusRequestDTO);
        issueStatusRepository.save(issueStatus);
        return issueStatusMapper.toDto(issueStatus);
    }


    public IssueStatusDTO updateIssueStatus(Long id, IssueStatusRequestDTO issueStatusRequestDTO) {
        IssueStatus issueStatus = loadIssueStatusOrFail(id);

        if(!issueStatus.getName().equalsIgnoreCase(issueStatusRequestDTO.name())
                && issueStatusRepository.existsByNameIgnoreCase(issueStatusRequestDTO.name())){
            throw new ResourceAlreadyExistsException("Issue Status already exists");
        }

        issueStatusMapper.updateFromDto(issueStatusRequestDTO, issueStatus);
        issueStatusRepository.save(issueStatus);

        return issueStatusMapper.toDto(issueStatus);
    }

    public void deleteIssueStatus(Long id) {

        IssueStatus issueStatus = loadIssueStatusOrFail(id);
        issueStatusRepository.delete(issueStatus);
    }

    public IssueStatus loadIssueStatusOrFail(Long id) {
        IssueStatus issueStatus = issueStatusRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Issue Status not found")
        );
        return issueStatus;
    }


}
