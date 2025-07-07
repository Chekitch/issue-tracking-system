package com.cmlcz.projects.its_backend.issue.dto.IssueActivity;


public record IssueActivityDTO(

        Long id,

        String description,

        String performed_by_username
) {
}
