package com.cmlcz.projects.its_backend.auth.service;

import com.cmlcz.projects.its_backend.auth.dto.JwtResponse;
import com.cmlcz.projects.its_backend.common.security.jwt.JwtUtils;
import com.cmlcz.projects.its_backend.common.security.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, JwtUtils jwtUtils, CustomUserDetailsService userDetailsService){
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    public JwtResponse login(String username, String rawPassword){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, rawPassword));
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String token = jwtUtils.generate(principal);
        List<String> auths = principal.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList();

        return new JwtResponse(token, principal.getUsername(), auths);
    }
}
