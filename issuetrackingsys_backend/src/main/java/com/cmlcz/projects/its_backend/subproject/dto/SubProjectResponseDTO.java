package com.cmlcz.projects.its_backend.subproject.dto;

import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import lombok.Data;

import java.util.UUID;

public record SubProjectResponseDTO(
        UUID id,
        String projectName,
        String description,
        UserSummaryDTO createdBy
){

}
