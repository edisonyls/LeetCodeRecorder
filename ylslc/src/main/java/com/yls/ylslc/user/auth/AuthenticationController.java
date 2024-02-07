package com.yls.ylslc.user.auth;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.user.UserEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthenticationController {
    private AuthServiceImpl authServiceImpl;

    public AuthenticationController(AuthServiceImpl authServiceImpl) {
        this.authServiceImpl = authServiceImpl;
    }

    @PostMapping(path = "/register")
    public Response register(@RequestBody UserEntity request){
        return authServiceImpl.register(request);
    }

    @PostMapping(path = "/authenticate")
    public Response login(@RequestBody UserEntity request){
        System.out.println("Hello");
        return authServiceImpl.authenticate(request);
    }
}
