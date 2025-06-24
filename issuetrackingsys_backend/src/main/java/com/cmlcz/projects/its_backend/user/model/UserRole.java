package com.cmlcz.projects.its_backend.user.model;

import com.cmlcz.projects.its_backend.common.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_role")
public class UserRole extends BaseModel {


    @Column(nullable = false, unique = true)
    private String role; // ADMIN, PROJECT_MANAGER, DEVELOPER, TESTER, REPORTER
    private String description;

    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    @JoinTable(
            name= "role_permission",
            joinColumns=@JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<UserPermission> permissions;
}
