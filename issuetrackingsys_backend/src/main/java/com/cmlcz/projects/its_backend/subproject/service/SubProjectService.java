package com.cmlcz.projects.its_backend.subproject.service;

import com.cmlcz.projects.its_backend.common.service.CreatedByService;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectCreateDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectResponseDTO;
import com.cmlcz.projects.its_backend.subproject.dto.SubProjectUpdateDTO;
import com.cmlcz.projects.its_backend.user.model.User;

import java.util.List;
import java.util.UUID;

public interface SubProjectService extends CreatedByService<SubProjectCreateDTO, SubProjectResponseDTO, UUID, User> {

    SubProjectResponseDTO findById(UUID id);
    List<SubProjectResponseDTO> findByParentProjectId(UUID parentId);
    SubProjectResponseDTO createUnderParent(SubProjectCreateDTO subProject, UUID parentId);
    SubProjectResponseDTO update(UUID id, SubProjectUpdateDTO subProject);
    void deleteById(UUID id);
}
