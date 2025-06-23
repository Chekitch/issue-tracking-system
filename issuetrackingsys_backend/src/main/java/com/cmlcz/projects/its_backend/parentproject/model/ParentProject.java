package com.cmlcz.projects.its_backend.parentproject.model;

import com.cmlcz.projects.its_backend.common.model.BaseUuidModel;
import com.cmlcz.projects.its_backend.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="parent_project")
public class ParentProject extends BaseUuidModel {

    private String projectName;
    private String description;

    @ManyToOne(fetch=FetchType.LAZY, cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name="created_by", nullable=false)
    private User createdBy;

}
