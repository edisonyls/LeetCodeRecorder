package com.yls.ylslc.user.auth;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.user.UserEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthenticationController {
    private AuthServiceImpl authServiceImpl;

    public AuthenticationController(AuthServiceImpl authServiceImpl) {
        this.authServiceImpl = authServiceImpl;
    }

    @GetMapping(path="/health")
    public String healthCheck(){
        return "OK";
    }
    
    @PostMapping(path = "/register")
    public Response register(@RequestBody UserEntity request){
        return authServiceImpl.register(request);
    }

    @PostMapping(path = "/authenticate")
    public Response login(@RequestBody UserEntity request){
        return authServiceImpl.authenticate(request);
    }
}
