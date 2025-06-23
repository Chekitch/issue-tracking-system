package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.UserRoleRequestDTO;
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
    public ResponseEntity<ApiResponse<UserRoleResponseDTO>> createRole(@RequestBody @Valid UserRoleRequestDTO userRoleRequestDTO){
        UserRoleResponseDTO userRoleResponseDTO = userRoleService.create(userRoleRequestDTO);
        ApiResponse<UserRoleResponseDTO> apiResponse = new ApiResponse<>
                (userRoleResponseDTO, ControllerMessages.CREATE_SUCCESS, ControllerMessages.CREATE_SUCCESS_CODE);

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserRoleResponseDTO>>> getRoles(){
        return null;
    }



}
