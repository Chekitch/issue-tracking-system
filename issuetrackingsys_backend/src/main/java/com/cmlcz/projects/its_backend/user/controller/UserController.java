package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.constants.ControllerMessages;
import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.user.CreateUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UpdateUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserSummaryDTO>> createUser(@RequestBody @Valid CreateUserDTO requestDTO) {

        UserSummaryDTO userSummaryDTO = userService.create(requestDTO);
        ApiResponse<UserSummaryDTO> response = new ApiResponse<>(userSummaryDTO, "Created user", 200);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserSummaryDTO>>> getAllUsers(){

        List<UserSummaryDTO> userSummaryDTOS = userService.getAllUsers();
        ApiResponse<List<UserSummaryDTO>> response = new ApiResponse<>(userSummaryDTOS, ControllerMessages.LIST_SUCCESS, ControllerMessages.LIST_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserSummaryDTO>> getUserById(@PathVariable UUID id){
        UserSummaryDTO userSummaryDTO = userService.getUserById(id);
        ApiResponse<UserSummaryDTO> response = new ApiResponse<>(userSummaryDTO, ControllerMessages.FETCH_SUCCESS, ControllerMessages.FETCH_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserSummaryDTO>> updateUser(@RequestBody @Valid UpdateUserDTO updateUserDTO, @PathVariable UUID id){
        UserSummaryDTO userSummaryDTO = userService.updateUser(id, updateUserDTO);
        ApiResponse<UserSummaryDTO> response = new ApiResponse<>(userSummaryDTO, ControllerMessages.UPDATE_SUCCESS, ControllerMessages.UPDATE_SUCCESS_CODE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID id){
        userService.deleteUser(id);

        ApiResponse<Void> response = new ApiResponse<>(null, ControllerMessages.DELETE_SUCCESS, ControllerMessages.DELETE_SUCCESS_CODE);

        return ResponseEntity.ok(response);
    }
}
