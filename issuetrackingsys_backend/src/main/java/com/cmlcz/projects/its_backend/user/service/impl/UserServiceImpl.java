package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.dto.UserCreateRequestDTO;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.cmlcz.projects.its_backend.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRoleRepository userRoleRepository;
    private final UserMapper userMapper;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, UserRoleRepository userRoleRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRoleRepository = userRoleRepository;
        this.userMapper = userMapper;
    }

    public Collection<UserSummaryDTO> findAll() {
        return List.of();
    }

    public User findById(UUID uuid) {

        User user = userRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + uuid));

        return user;
    }

    public UserSummaryDTO create(UserCreateRequestDTO userRequestDTO) {

//        User user = new User();
//
//        UserRole userRole = userRoleRepository.findById(userRequestDTO.getRoleId())
//                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id " + userRequestDTO.getRoleId()));
//        user.setRole(userRole);
//
//        user.setUsername(userRequestDTO.getUsername());
//        user.setEmail(userRequestDTO.getEmail());
//        user.setFullName(userRequestDTO.getFullName());
//
//        user.setHashedPassword(passwordEncoder.encode(userRequestDTO.getPassword()));

        User user = userMapper.toEntity(userRequestDTO, userRoleRepository, passwordEncoder);

        userRepository.save(user);

        return userMapper.toDTO(user);

    }

    public UserSummaryDTO update(UserCreateRequestDTO userRequestDTO) {
        return null;
    }

    public boolean deleteById(UUID uuid) {
        return false;
    }
}
