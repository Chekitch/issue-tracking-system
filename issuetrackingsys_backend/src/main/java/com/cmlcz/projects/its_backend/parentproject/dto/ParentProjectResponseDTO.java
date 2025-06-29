package com.cmlcz.projects.its_backend.parentproject.dto;

import java.util.UUID;


public record ParentProjectResponseDTO(
        UUID id,
        String projectName,
        String description
){

}