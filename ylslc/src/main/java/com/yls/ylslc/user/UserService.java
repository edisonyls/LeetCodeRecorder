package com.yls.ylslc.user;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    List<UserEntity> getUsers();

    Optional<UserEntity> findOneByUsername(String username);

    void delete(UUID id);

    UserEntity getCurrentUser();

    UserEntity updateUser(UUID id, UserEntity userEntity);
}
