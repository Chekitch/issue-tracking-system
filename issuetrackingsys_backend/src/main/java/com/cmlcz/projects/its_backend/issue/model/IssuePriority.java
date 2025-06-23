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
public class IssuePriority extends BaseModel {

    private String name; // Highest, High, Medium, Low

    private String description; // Issue Priority Description such as "it needs to be fixed in 6 hours"

    private String color; // #dc3545

}
