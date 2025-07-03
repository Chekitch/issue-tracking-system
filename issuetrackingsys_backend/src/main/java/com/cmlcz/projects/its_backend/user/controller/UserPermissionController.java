package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.userPermission.CreateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UpdateUserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;
import com.cmlcz.projects.its_backend.user.service.UserPermissionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class UserPermissionController {

    private final UserPermissionService userPermissionService;

    @Autowired
    public UserPermissionController(UserPermissionService userPermissionService){
        this.userPermissionService = userPermissionService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserPermissionDTO>> createPermission(@RequestBody @Valid CreateUserPermissionDTO userPermissionRequest){
        UserPermissionDTO userPermissionDTO = userPermissionService.createPermission(userPermissionRequest);
        ApiResponse<UserPermissionDTO> response = new ApiResponse<>(userPermissionDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserPermissionDTO>>> getAllPermissions(){
        List<UserPermissionDTO> userPermissionRespons = userPermissionService.getAllPermissions();
        ApiResponse<List<UserPermissionDTO>> response = new ApiResponse<>
                (userPermissionRespons, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserPermissionDTO>> updatePermission(@RequestBody @Valid UpdateUserPermissionDTO updateUserPermissionDTO, @PathVariable Long id){
        UserPermissionDTO userPermissionDTO = userPermissionService.update(updateUserPermissionDTO, id);
        ApiResponse<UserPermissionDTO> response = new ApiResponse<>
                (userPermissionDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);

        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePermission(@PathVariable Long id){
        userPermissionService.delete(id);

        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }


}
