package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.user.service.UserPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("roles/{userRoleId}/permissions")
public class UserPermissionController {

    private final UserPermissionService userPermissionService;

    @Autowired
    public UserPermissionController(UserPermissionService userPermissionService){
        this.userPermissionService = userPermissionService;
    }
}
