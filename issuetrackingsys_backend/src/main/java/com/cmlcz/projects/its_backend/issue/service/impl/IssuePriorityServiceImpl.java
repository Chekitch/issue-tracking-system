package com.cmlcz.projects.its_backend.issue.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssuePriority.IssuePriorityRequestDTO;
import com.cmlcz.projects.its_backend.issue.mapper.IssuePriorityMapper;
import com.cmlcz.projects.its_backend.issue.model.IssuePriority;
import com.cmlcz.projects.its_backend.issue.repository.IssuePriorityRepository;
import com.cmlcz.projects.its_backend.issue.service.IssuePriorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class IssuePriorityServiceImpl implements IssuePriorityService {


    private final IssuePriorityRepository issuePriorityRepository;
    private final IssuePriorityMapper issuePriorityMapper;

    @Autowired
    public IssuePriorityServiceImpl(IssuePriorityRepository issuePriorityRepository, IssuePriorityMapper issuePriorityMapper) {
        this.issuePriorityRepository = issuePriorityRepository;
        this.issuePriorityMapper = issuePriorityMapper;
    }

    @Override
    public List<IssuePriorityDTO> getAllIssuePriorities() {
        List<IssuePriority> issues = issuePriorityRepository.getAllIssueStatusesByOrderByCreationDateAsc();

        return issues
                .stream()
                .map(issuePriorityMapper::toDto)
                .toList();
    }

    public IssuePriorityDTO getIssuePriorityById(Long id) {
        IssuePriority issuePriority = getIssuePriorityOrFail(id);
        return issuePriorityMapper.toDto(issuePriority);
    }

    public IssuePriorityDTO createIssuePriority(IssuePriorityRequestDTO issuePriorityRequestDTO) {

        if(issuePriorityRepository.existsByNameIgnoreCase(issuePriorityRequestDTO.name())){
            throw new ResourceAlreadyExistsException("Issue Priority already exists");
        }

        IssuePriority issuePriority = issuePriorityMapper.toEntity(issuePriorityRequestDTO);

        issuePriorityRepository.save(issuePriority);

        return issuePriorityMapper.toDto(issuePriority);
    }

    @Override
    public IssuePriorityDTO updateIssuePriority(IssuePriorityRequestDTO issuePriorityRequestDTO, Long id) {
        IssuePriority issuePriority = getIssuePriorityOrFail(id);

        if(!issuePriority.getName().equalsIgnoreCase(issuePriorityRequestDTO.name())
                && issuePriorityRepository.existsByNameIgnoreCase(issuePriorityRequestDTO.name())){
            throw new ResourceNotFoundException("Issue Priority already exists");
        }

        issuePriorityMapper.updateFromDto(issuePriorityRequestDTO, issuePriority);

        issuePriorityRepository.save(issuePriority);

        return issuePriorityMapper.toDto(issuePriority);

    }

    public void deleteIssuePriority(Long id) {
        IssuePriority issuePriority = getIssuePriorityOrFail(id);

        issuePriorityRepository.delete(issuePriority);

    }

    public IssuePriority getIssuePriorityOrFail(Long id) {
        return issuePriorityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue Priority not found"));
    }
}
