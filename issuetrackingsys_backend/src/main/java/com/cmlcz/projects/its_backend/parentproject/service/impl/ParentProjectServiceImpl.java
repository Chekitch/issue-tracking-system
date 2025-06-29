package com.cmlcz.projects.its_backend.parentproject.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectCreateDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectUpdateDTO;
import com.cmlcz.projects.its_backend.parentproject.mapper.ParentProjectMapper;
import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.parentproject.repository.ParentProjectRepository;
import com.cmlcz.projects.its_backend.parentproject.service.ParentProjectService;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.hibernate.annotations.Parent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ParentProjectServiceImpl implements ParentProjectService {


    private final ParentProjectRepository parentProjectRepository;
    private final UserRepository userRepository;
    private final ParentProjectMapper parentProjectMapper;

    @Autowired
    public ParentProjectServiceImpl(ParentProjectRepository parentProjectRepository, UserRepository userRepository, ParentProjectMapper parentProjectMapper) {
        this.parentProjectRepository = parentProjectRepository;
        this.userRepository = userRepository;
        this.parentProjectMapper = parentProjectMapper;
    }

    @Transactional
    public ArrayList<ParentProjectResponseDTO> findAll() {


        List<ParentProject> parentProjectList = parentProjectRepository.findAllByOrderByCreationDateAsc();

        ArrayList<ParentProjectResponseDTO> parentProjectResponseDTOList = new ArrayList<>();

        parentProjectList.forEach(parentProject -> parentProjectResponseDTOList.add(parentProjectMapper.toDto(parentProject)));

        return parentProjectResponseDTOList;
    }

    @Transactional
    public ParentProjectResponseDTO findById(UUID uuid) {

        ParentProject parentProject = parentProjectRepository.findById(uuid).orElseThrow(
                () -> new ResourceNotFoundException("Parent Project with UUID " + uuid + " not found")
        );

        return parentProjectMapper.toDto(parentProject);
    }

    @Override
    @Transactional
    public ParentProjectResponseDTO update(UUID uuid, ParentProjectUpdateDTO parentProjectUpdateRequestDTO) {
        ParentProject parentProject = parentProjectRepository.findById(uuid).orElseThrow(
                () -> new ResourceNotFoundException("There is no such parent project with id: " + uuid)
        );

        parentProject.setProjectName(parentProjectUpdateRequestDTO.getProjectName());
        parentProject.setDescription(parentProjectUpdateRequestDTO.getDescription());

        parentProjectRepository.save(parentProject);

        return parentProjectMapper.toDto(parentProject);

    }

    @Transactional
    public ParentProjectResponseDTO create(ParentProjectCreateDTO parentProjectCreateRequestDTO) {

        if(!userRepository.existsById(parentProjectCreateRequestDTO.getCreatedById())) throw new ResourceNotFoundException("There is no such user");

        ParentProject parentProject = parentProjectMapper.toEntity(parentProjectCreateRequestDTO);
        parentProjectRepository.save(parentProject);

        return parentProjectMapper.toDto(parentProject);
    }


    @Transactional
    public boolean deleteById(UUID uuid) {
        ParentProject project = parentProjectRepository.findById(uuid).orElseThrow(
                () -> new ResourceNotFoundException("Parent Project with UUID " + uuid + " not found")
        );

        parentProjectRepository.delete(project);

        return true;
    }
}
