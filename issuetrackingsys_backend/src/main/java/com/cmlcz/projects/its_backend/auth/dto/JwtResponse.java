package com.cmlcz.projects.its_backend.auth.dto;

import java.util.List;

public record JwtResponse(String token, String username, List<String> authorities) {
}
