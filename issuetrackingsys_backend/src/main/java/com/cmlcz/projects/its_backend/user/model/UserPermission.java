package com.cmlcz.projects.its_backend.user.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class UserPermission extends BaseModel {

    private String name;
    private String description;


}
