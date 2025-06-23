package com.cmlcz.projects.its_backend.parentproject.dto;

import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParentProjectResponseDTO {

    private String projectName;
    private String description;
    private UserSummaryDTO createdBy;

}
