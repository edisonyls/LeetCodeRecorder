package com.yls.ylslc.auth;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.user.UserEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthenticationController {
    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(path = "/register")
    public Response register(@RequestBody UserEntity request){
        return Response.ok(authenticationService.register(request), "User register successfully!");
    }

    @PostMapping(path = "/authenticate")
    public Response login(@RequestBody UserEntity request){
        System.out.println("Hello");
        return Response.ok(authenticationService.authenticate(request), "User is authenticated!");
    }
}
