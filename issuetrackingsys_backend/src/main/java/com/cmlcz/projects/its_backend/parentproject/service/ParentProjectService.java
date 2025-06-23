package com.cmlcz.projects.its_backend.parentproject.service;

import com.cmlcz.projects.its_backend.common.service.CreatedByService;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectCreateDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectUpdateDTO;
import com.cmlcz.projects.its_backend.user.model.User;

import java.util.List;
import java.util.UUID;

public interface ParentProjectService extends CreatedByService<ParentProjectCreateDTO, ParentProjectResponseDTO, UUID, User> {
    List<ParentProjectResponseDTO> findAll();
    ParentProjectResponseDTO create(ParentProjectCreateDTO parentProjectCreateRequestDTO);
    ParentProjectResponseDTO findById(UUID uuid);
    ParentProjectResponseDTO update(UUID uuid, ParentProjectUpdateDTO parentProjectCreateRequestDTO);
    boolean deleteById(UUID uuid);
}
