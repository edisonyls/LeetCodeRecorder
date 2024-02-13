package com.yls.ylslc.user;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserEntity> getUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    @Override
    public Optional<UserEntity> findOneByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Override
    public void delete(Long id){
        userRepository.deleteById(id);
    }
}
