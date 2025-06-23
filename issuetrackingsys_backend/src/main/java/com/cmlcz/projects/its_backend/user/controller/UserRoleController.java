package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRoleRequest;
import com.cmlcz.projects.its_backend.user.dto.UserRoleResponseDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.service.UserRoleService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class UserRoleController {

    private UserRoleService userRoleService;

    @Autowired
    public UserRoleController(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserRoleResponseDTO>> createRole(@RequestBody @Valid CreateUserRoleRequest createUserRoleRequest){
        UserRoleResponseDTO userRoleResponseDTO = userRoleService.create(createUserRoleRequest);
        ApiResponse<UserRoleResponseDTO> response = new ApiResponse<>
                (userRoleResponseDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserRoleResponseDTO>>> getAllRoles(){
        List<UserRoleResponseDTO> userRoleResponseDTOs = userRoleService.getAllRoles();
        ApiResponse<List<UserRoleResponseDTO>> response = new ApiResponse<>
                (userRoleResponseDTOs, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{roleId}/permissions/{permissionId}")
    public ResponseEntity<ApiResponse<UserRoleResponseDTO>> addPermissionToRole(@PathVariable Long roleId, @PathVariable Long permissionId){
        UserRoleResponseDTO updatedRole = userRoleService.assignPermission(roleId, permissionId);
        ApiResponse<UserRoleResponseDTO> response = new ApiResponse<>(updatedRole, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }



}
