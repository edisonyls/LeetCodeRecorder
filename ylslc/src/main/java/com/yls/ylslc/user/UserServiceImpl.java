package com.yls.ylslc.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserEntity> getUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    @Override
    public Optional<UserEntity> findOneByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public UserEntity updateUser(UUID id, UserEntity updatedUser) {
        return userRepository.findById(id)
                .map(userEntity -> {
                    userEntity.setFirstName(updatedUser.getFirstName());
                    userEntity.setLastName(updatedUser.getLastName());
                    userEntity.setSex(updatedUser.getSex());
                    userEntity.setMobileNumber(updatedUser.getMobileNumber());
                    userEntity.setPersonalInfo(updatedUser.getPersonalInfo());
                    return userRepository.save(userEntity);
                }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }
}
