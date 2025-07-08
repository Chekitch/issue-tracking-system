package com.cmlcz.projects.its_backend.comment.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseModel {

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="issue_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Issue issue;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="author_id")
    private User createdBy;
}
