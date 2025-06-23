package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.CreateUserPermissionRequest;
import com.cmlcz.projects.its_backend.user.dto.UserPermissionResponse;
import com.cmlcz.projects.its_backend.user.service.UserPermissionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/permissions")
public class UserPermissionController {

    private final UserPermissionService userPermissionService;

    @Autowired
    public UserPermissionController(UserPermissionService userPermissionService){
        this.userPermissionService = userPermissionService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserPermissionResponse>> createPermission(@RequestBody @Valid CreateUserPermissionRequest userPermissionRequest){
        UserPermissionResponse userPermissionResponse = userPermissionService.createPermission(userPermissionRequest);
        ApiResponse<UserPermissionResponse> response = new ApiResponse<>(userPermissionResponse, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return new ResponseEntity<ApiResponse<UserPermissionResponse>>(response, HttpStatus.CREATED);
    }
}
