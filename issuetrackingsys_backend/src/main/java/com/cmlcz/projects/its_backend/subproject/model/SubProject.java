package com.cmlcz.projects.its_backend.subproject.model;

import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.common.model.BaseUuidModel;
import com.cmlcz.projects.its_backend.user.model.User;
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
public class SubProject extends BaseUuidModel {

    private String projectName;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name= "created_by", nullable=false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private ParentProject parentProject;


}
