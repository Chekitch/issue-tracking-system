package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import com.cmlcz.projects.its_backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueActivity extends BaseModel {

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="issue_id", nullable = false)
    @JsonIgnore
    private Issue issue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="performed_by_id")
    private User performedBy;

}
