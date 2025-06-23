package com.cmlcz.projects.its_backend.subproject.dto;

import com.cmlcz.projects.its_backend.parentproject.dto.ParentProjectResponseDTO;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import lombok.Data;


@Data
public class SubProjectResponseDTO {

    private String projectName;
    private String description;

    private UserSummaryDTO createdBy;

    private ParentProjectResponseDTO parentProject;
}
