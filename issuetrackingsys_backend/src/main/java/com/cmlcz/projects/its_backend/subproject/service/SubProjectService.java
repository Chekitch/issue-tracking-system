package com.cmlcz.projects.its_backend.subproject.service;

import com.cmlcz.projects.its_backend.subproject.dto.SubProjectRequestDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface SubProjectService {

    SubProjectResponseDTO findById(UUID parentId, UUID id);
    List<SubProjectResponseDTO> findByParentProjectId(UUID parentId);
    SubProjectResponseDTO createUnderParent(SubProjectRequestDTO subProject, UUID parentId);
    SubProjectResponseDTO update(UUID id, SubProjectUpdateDTO subProject);
    void deleteById(UUID id);
}
