package com.cmlcz.projects.its_backend.subproject.dto;

import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;

import java.util.UUID;

public record SubProjectResponseDTO(
        UUID id,
        String projectName,
        String description,
        UserSummaryDTO createdBy
){

}
