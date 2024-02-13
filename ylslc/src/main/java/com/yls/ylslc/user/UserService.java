package com.yls.ylslc.user;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserEntity> getUsers();

    Optional<UserEntity> findOneByUsername(String username);

    void delete(Long id);
}
