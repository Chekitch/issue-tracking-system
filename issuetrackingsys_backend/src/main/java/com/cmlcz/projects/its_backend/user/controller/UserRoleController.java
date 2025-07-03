package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.userPermission.UserPermissionDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.CreateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UpdateUserRoleDTO;
import com.cmlcz.projects.its_backend.user.dto.userRole.UserRoleDTO;
import com.cmlcz.projects.its_backend.user.service.UserRoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class UserRoleController {

    private final UserRoleService userRoleService;

    @Autowired
    public UserRoleController(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserRoleDTO>>> getAllRoles(){
        List<UserRoleDTO> userRoleDTOS = userRoleService.getAllRoles();
        ApiResponse<List<UserRoleDTO>> response = new ApiResponse<>
                (userRoleDTOS, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserRoleDTO>> createRole(@RequestBody @Valid CreateUserRoleDTO createUserRoleDTO){
        UserRoleDTO userRoleDTO = userRoleService.create(createUserRoleDTO);
        ApiResponse<UserRoleDTO> response = new ApiResponse<>
                (userRoleDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserRoleDTO>> updateRole(@RequestBody @Valid UpdateUserRoleDTO updateUserRoleDTO, @PathVariable Long id){
        UserRoleDTO userRoleDTO = userRoleService.update(id, updateUserRoleDTO);
        ApiResponse<UserRoleDTO> response = new ApiResponse<>
                (userRoleDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable Long id){
        userRoleService.delete(id);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/{roleId}/permissions/{permissionId}")
    public ResponseEntity<ApiResponse<Void>> addPermissionToRole(@PathVariable Long roleId, @PathVariable Long permissionId){
        userRoleService.assignPermission(roleId, permissionId);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{roleId}/permissions/{permissionId}")
    public ResponseEntity<ApiResponse<Void>> deletePermissionFromRole(@PathVariable Long roleId, @PathVariable Long permissionId){
        userRoleService.removePermission(roleId,permissionId);
        ApiResponse<Void> response = new ApiResponse<>
                (null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{roleId}/permissions")
    public ResponseEntity<ApiResponse<List<UserPermissionDTO>>> getPermissionsByRoleId(@PathVariable Long roleId){
        List<UserPermissionDTO> permissions = userRoleService.getPermissionsByRole(roleId);
        ApiResponse<List<UserPermissionDTO>> response = new ApiResponse<>
                (permissions, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }



}
