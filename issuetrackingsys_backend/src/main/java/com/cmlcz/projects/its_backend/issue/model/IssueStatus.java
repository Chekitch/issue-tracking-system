package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueStatus extends BaseModel {

    private String name; // OPEN, IN PROGRESS, IN_REVIEW, CLOSED, RESOLVED

    private String description;

}
