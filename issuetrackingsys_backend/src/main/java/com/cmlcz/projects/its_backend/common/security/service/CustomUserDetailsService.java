package com.cmlcz.projects.its_backend.common.security.service;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.common.security.principal.UserPrincipal;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDetails loadUserByUsername(String username){
        return userRepository.findByUsername(username)
                .map(UserPrincipal::new)
                .orElseThrow(
                        () -> new ResourceNotFoundException("User not found")
                );
    }
}
