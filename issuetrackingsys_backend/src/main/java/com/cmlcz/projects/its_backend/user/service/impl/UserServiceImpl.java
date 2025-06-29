package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.dto.CreateUserRequest;
import com.cmlcz.projects.its_backend.user.dto.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import com.cmlcz.projects.its_backend.user.repository.UserRoleRepository;
import com.cmlcz.projects.its_backend.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    @Transactional(readOnly = true)
    public UserSummaryDTO getUserById(UUID id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return userMapper.toDTO(user);
    }

    @Transactional
    public UserSummaryDTO create(CreateUserRequest userRequestDTO) {

        if(!userRoleRepository.existsById(userRequestDTO.getRoleId())){
            throw new ResourceNotFoundException("There is no role with id : " + userRequestDTO.getRoleId());
        }

        User user = userMapper.toEntity(userRequestDTO, userRoleRepository, passwordEncoder);

        userRepository.save(user);

        return userMapper.toDTO(user);

    }

    @Override
    @Transactional(readOnly = true)
    public List<UserSummaryDTO> getAllUsers() {
        List<User> users = userRepository.findAllWithRoles();

        return userMapper.toDTOs(users);

    }

    @Transactional
    public UserSummaryDTO update(CreateUserRequest userRequestDTO) {
        return null;
    }

    @Transactional
    public boolean deleteById(UUID uuid) {
        return false;
    }
}
