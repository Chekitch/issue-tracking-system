package com.cmlcz.projects.its_backend.user.controller;

import com.cmlcz.projects.its_backend.common.dto.ApiResponse;
import com.cmlcz.projects.its_backend.user.dto.UserCreateRequestDTO;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import com.cmlcz.projects.its_backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserSummaryDTO>> createUser(@RequestBody @Valid UserCreateRequestDTO requestDTO) {

        UserSummaryDTO userSummaryDTO = userService.create(requestDTO);

        ApiResponse<UserSummaryDTO> response = new ApiResponse<>(userSummaryDTO, "Created user", 200);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<User> findAll() {
        return null;
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable UUID id){
        return null;
    }
}
