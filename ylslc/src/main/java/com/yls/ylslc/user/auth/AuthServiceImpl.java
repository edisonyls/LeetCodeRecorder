package com.yls.ylslc.user.auth;

import com.yls.ylslc.config.jwt.JwtService;
import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.user.UserRepository;
import com.yls.ylslc.user.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Response register(UserEntity request){
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return Response.failed(HttpStatus.CONFLICT, "User registered before!");
        } else {
            UserEntity user = new UserEntity();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(request.getRole());
            user = userRepository.save(user);

            return Response.ok(jwtService.generateToken(user), "User registered successfully!");
        }
    }

    @Override
    public Response authenticate(UserEntity request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserEntity user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        return Response.ok(jwtService.generateToken(user), "User authenticated successfully!");
    }
}
