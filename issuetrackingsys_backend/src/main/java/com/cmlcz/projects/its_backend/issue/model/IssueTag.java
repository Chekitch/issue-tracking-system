package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueTag extends BaseModel {

    @JoinColumn(name="tag_name")
    private String tagName;

}
