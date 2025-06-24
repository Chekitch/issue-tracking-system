package com.cmlcz.projects.its_backend.user.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPermission extends BaseModel {

    @Column(nullable = false, unique = true)
    private String name; // CREATE_ISSUE
    private String description;


}
