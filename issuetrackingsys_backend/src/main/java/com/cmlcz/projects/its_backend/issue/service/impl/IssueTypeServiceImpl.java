package com.cmlcz.projects.its_backend.issue.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueType.IssueTypeRequestDTO;
import com.cmlcz.projects.its_backend.issue.mapper.IssueTypeMapper;
import com.cmlcz.projects.its_backend.issue.model.IssueType;
import com.cmlcz.projects.its_backend.issue.repository.IssueTypeRepository;
import com.cmlcz.projects.its_backend.issue.service.IssueTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class IssueTypeServiceImpl implements IssueTypeService {

    private final IssueTypeRepository issueTypeRepository;
    private final IssueTypeMapper issueTypeMapper;

    @Autowired
    public IssueTypeServiceImpl(IssueTypeRepository issueTypeRepository, IssueTypeMapper issueTypeMapper) {
        this.issueTypeRepository = issueTypeRepository;
        this.issueTypeMapper = issueTypeMapper;
    }

    @Override
    public List<IssueTypeDTO> getAllIssueTypes() {
        List<IssueType> issueTypes = issueTypeRepository.getAllIssueTypesByOrderByCreationDateAsc();

        return issueTypeMapper.toDTOs(issueTypes);
    }

    @Override
    public IssueTypeDTO createIssueType(IssueTypeRequestDTO issueTypeRequestDTO) {

        if(issueTypeRepository.existsByNameIgnoreCase(issueTypeRequestDTO.name())){
            throw new ResourceAlreadyExistsException("Issue type already exists");
        }

        IssueType issueType = issueTypeMapper.toEntity(issueTypeRequestDTO);
        issueTypeRepository.save(issueType);

        return issueTypeMapper.toDTO(issueType);
    }

    @Override
    public IssueTypeDTO getIssueTypeById(Long id) {

        IssueType issueType = loadIssueTypeOrFail(id);

        return issueTypeMapper.toDTO(issueType);
    }

    @Override
    public IssueTypeDTO update(Long id, IssueTypeRequestDTO issueTypeRequestDTO) {

        IssueType issueType = loadIssueTypeOrFail(id);

        if(!issueType.getName().equalsIgnoreCase(issueTypeRequestDTO.name()) && issueTypeRepository.existsByNameIgnoreCase(issueTypeRequestDTO.name())){
            throw new ResourceAlreadyExistsException("Issue type already exists");
        }

        issueTypeMapper.updateFromDto(issueTypeRequestDTO, issueType);
        issueTypeRepository.save(issueType);

        return issueTypeMapper.toDTO(issueType);
    }

    @Override
    public void deleteIssueType(Long id) {

        IssueType issueType = loadIssueTypeOrFail(id);
        issueTypeRepository.delete(issueType);
    }


    public IssueType loadIssueTypeOrFail(Long id) {
        return issueTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Issue type not found"));
    }
}
