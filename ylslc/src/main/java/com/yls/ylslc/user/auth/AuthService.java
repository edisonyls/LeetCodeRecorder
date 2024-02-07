package com.yls.ylslc.user.auth;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.user.UserEntity;

public interface AuthService {

    Response register(UserEntity request);
    Response authenticate(UserEntity request);
}
