package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.common.model.BaseUuidModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueType extends BaseUuidModel {

    private String name; // BUG, TASK, FEATURE, IMPROVEMENT
    private String description;
}
