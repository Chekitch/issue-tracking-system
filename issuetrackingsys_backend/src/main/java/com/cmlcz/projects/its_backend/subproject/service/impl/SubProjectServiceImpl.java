package com.cmlcz.projects.its_backend.subproject.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.parentproject.repository.ParentProjectRepository;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectCreateDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectUpdateDTO;
import com.cmlcz.projects.its_backend.subproject.mapper.SubProjectMapper;
import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import com.cmlcz.projects.its_backend.subproject.repository.SubProjectRepository;
import com.cmlcz.projects.its_backend.subproject.service.SubProjectService;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class SubProjectServiceImpl implements SubProjectService {

    private final SubProjectRepository subProjectRepository;
    private final ParentProjectRepository parentProjectRepository;
    private final SubProjectMapper subProjectMapper;
    private final UserRepository userRepository;

    @Autowired
    public SubProjectServiceImpl(SubProjectRepository subProjectRepository, ParentProjectRepository parentProjectRepository, SubProjectMapper subProjectMapper, UserRepository userRepository) {
        this.subProjectRepository = subProjectRepository;
        this.parentProjectRepository = parentProjectRepository;
        this.subProjectMapper = subProjectMapper;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public SubProjectResponseDTO findById(UUID id) {
        SubProject subProject = subProjectRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Subproject not found")
        );

        return subProjectMapper.toDto(subProject);
    }

    @Transactional
    public List<SubProjectResponseDTO> findByParentProjectId(UUID parentId) {

        if(!parentProjectRepository.existsById(parentId)){
            throw new ResourceNotFoundException("Parent project not found");
        }

        List<SubProject> subProjects = subProjectRepository.findAllByParentProjectIdOrderByCreationDateAsc(parentId);

        ArrayList<SubProjectResponseDTO> subProjectResponseDTOS = new ArrayList<>();

        for(SubProject subProject : subProjects){
            subProjectResponseDTOS.add(subProjectMapper.toDto(subProject));
        }

        return subProjectResponseDTOS;
    }

    @Transactional
    public SubProjectResponseDTO createUnderParent(SubProjectCreateDTO subProjectRequest, UUID parentId) {

        if(!parentProjectRepository.existsById(parentId)) throw new ResourceNotFoundException("Parent project not found");
        if(!userRepository.existsById(subProjectRequest.createdById())) throw new ResourceNotFoundException("User not found");

        SubProject subProject = subProjectMapper.toEntity(subProjectRequest, parentId);

        User user = userRepository.getReferenceById(subProjectRequest.createdById());
        ParentProject parentProject = parentProjectRepository.getReferenceById(parentId);

        subProject.setCreatedBy(user);
        subProject.setParentProject(parentProject);

        subProjectRepository.save(subProject);

        return subProjectMapper.toDto(subProject);
    }

    @Override
    @Transactional
    public SubProjectResponseDTO update(UUID id, SubProjectUpdateDTO subProjectUpdateDTO) {
        SubProject subProject = subProjectRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Subproject not found"));

        subProject.setProjectName(subProjectUpdateDTO.projectName());
        subProject.setDescription(subProjectUpdateDTO.description());

        subProjectRepository.save(subProject);

        return subProjectMapper.toDto(subProject);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        SubProject subProject = subProjectRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Subproject not found"));

        subProjectRepository.delete(subProject);

    }
}
