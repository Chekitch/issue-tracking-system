package com.cmlcz.projects.its_backend.subproject.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.parentproject.repository.ParentProjectRepository;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectRequestDTO;
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
                () -> new ResourceNotFoundException("There is no subproject with the id")
        );

        return subProjectMapper.toDto(subProject);
    }

    @Transactional
    public List<SubProjectResponseDTO> findByParentProjectId(UUID parentId) {
        List<SubProject> subProjects = subProjectRepository.findAllByParentProjectId(parentId);

        ArrayList<SubProjectResponseDTO> subProjectResponseDTOS = new ArrayList<>();

        for(SubProject subProject : subProjects){
            subProjectResponseDTOS.add(subProjectMapper.toDto(subProject));
        }

        return subProjectResponseDTOS;
    }

    @Transactional
    public SubProjectResponseDTO createUnderParent(SubProjectRequestDTO subProjectRequest, UUID parentId) {

        if(!parentProjectRepository.existsById(parentId)) throw new ResourceNotFoundException("There is no such parent project");
        if(!userRepository.existsById(subProjectRequest.getCreatedById())) throw new ResourceNotFoundException("There is no such user");

        SubProject subProject = subProjectMapper.toEntity(subProjectRequest);

        User user = userRepository.getReferenceById(subProjectRequest.getCreatedById());
        ParentProject parentProject = parentProjectRepository.getReferenceById(parentId);

        subProject.setCreatedBy(user);
        subProject.setParentProject(parentProject);

        subProjectRepository.save(subProject);

        return subProjectMapper.toDto(subProject);
    }

    @Override
    public SubProjectResponseDTO update(UUID id, SubProjectUpdateDTO subProjectUpdateDTO) {
        SubProject subProject = subProjectRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Resource Not Found"));

        subProject.setProjectName(subProjectUpdateDTO.getProjectName());
        subProject.setDescription(subProjectUpdateDTO.getDescription());

        subProjectRepository.save(subProject);

        return subProjectMapper.toDto(subProject);
    }

    @Override
    public void deleteById(UUID id) {
        SubProject subProject = subProjectRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Resource not found"));

        subProjectRepository.delete(subProject);

    }
}
