package com.cmlcz.projects.its_backend.auth.controller;

import com.cmlcz.projects.its_backend.auth.dto.JwtResponse;
import com.cmlcz.projects.its_backend.auth.dto.LoginRequest;
import com.cmlcz.projects.its_backend.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.login(
                loginRequest.username(),
                loginRequest.password()
        );
        return ResponseEntity.ok(response);
    }
}
