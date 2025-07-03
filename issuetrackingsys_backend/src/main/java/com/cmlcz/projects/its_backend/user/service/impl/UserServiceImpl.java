package com.cmlcz.projects.its_backend.user.service.impl;

import com.cmlcz.projects.its_backend.common.exception.ResourceAlreadyExistsException;
import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.user.dto.user.CreateUserDTO;
import com.cmlcz.projects.its_backend.user.dto.user.UpdateUserDTO;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.dto.user.UserSummaryDTO;
import com.cmlcz.projects.its_backend.user.model.UserRole;
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
@Transactional
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
        User user = loadUserOrFail(id);

        return userMapper.toDTO(user);
    }

    @Transactional
    public UserSummaryDTO create(CreateUserDTO userRequestDTO) {

        if(!userRoleRepository.existsById(userRequestDTO.roleId())){
            throw new ResourceNotFoundException("There is no role with that id ");
        }

        if(userRepository.existsByUsername(userRequestDTO.username())){
            throw new ResourceAlreadyExistsException("This username is already used");
        }

        User user = userMapper.toEntity(userRequestDTO, userRoleRepository, passwordEncoder);

        userRepository.save(user);

        return userMapper.toDTO(user);

    }

    @Override
    @Transactional(readOnly = true)
    public List<UserSummaryDTO> getAllUsers() {
        List<User> users = userRepository.findAllWithRolesByOrderByCreationDateAsc();

        return userMapper.toDTOs(users);

    }

    @Override
    @Transactional
    public UserSummaryDTO updateUser(UUID id, UpdateUserDTO updateUserDTO) {
        if(! userRepository.getReferenceById(id).getUsername().equals(updateUserDTO.username())
                && userRepository.existsByUsername(updateUserDTO.username()) ){
            throw new ResourceAlreadyExistsException("Username is already used");
        }

        User user = loadUserOrFail(id);
        user.setUsername(updateUserDTO.username());
        user.setFullName(updateUserDTO.fullName());
        if(updateUserDTO.password() != null && !updateUserDTO.password().equalsIgnoreCase("")){
            String hashedPassword = passwordEncoder.encode(updateUserDTO.password());
            user.setHashedPassword(hashedPassword);
        }
        UserRole userRole = userRoleRepository.findWithPermissionsById(updateUserDTO.roleId()).orElseThrow(
                () -> new ResourceNotFoundException("There is no that role")
        );

        user.setRole(userRole);

        userRepository.save(user);

        return userMapper.toDTO(user);


    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        User user = loadUserOrFail(id);

        userRepository.delete(user);

    }

    public User loadUserOrFail(UUID id){
        return userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

}
