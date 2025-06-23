package com.cmlcz.projects.its_backend.comment.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseModel {


    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="issue_id")
    private Issue issue;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="author_id")
    private User createdBy;
}
