package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.comment.model.Comment;
import com.cmlcz.projects.its_backend.subproject.model.SubProject;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.common.model.BaseUuidModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@DynamicUpdate
public class Issue extends BaseUuidModel {

    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_project_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SubProject subProject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="status_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private IssueStatus issueStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="priority_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private IssuePriority issuePriority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private IssueType issueType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private User assignee;

//    private LocalDateTime dueDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

//    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    private Set<IssueTag> tags;

//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "issue", orphanRemoval = true)
//    private List<IssueActivity> activityLogs;

//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Set<Attachment> attachments;

}
