package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
public class IssuePriority extends BaseModel {

    @Column(nullable = false,  unique = true)
    private String name; // Highest, High, Medium, Low

    private String description; // Issue Priority Description such as "it needs to be fixed in 6 hours"

    private String color; // #dc3545

}
