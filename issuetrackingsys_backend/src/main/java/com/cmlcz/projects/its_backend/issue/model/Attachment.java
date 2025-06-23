package com.cmlcz.projects.its_backend.issue.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import com.cmlcz.projects.its_backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attachment extends BaseModel {

    private String fileName;
    private String originalFileName;
    private String contentType;
    private long size;


    private String objectName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uplaoded_by")
    private User uploadedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    @JsonIgnore
    private Issue issue;

}
