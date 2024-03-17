package com.yls.ylslc.user;

import com.yls.ylslc.config.response.Response;
import com.yls.ylslc.mappers.Mapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="api/user")
@CrossOrigin(origins = {"http://localhost:3000", "https://ylslc.org"})
public class UserController {
    private final UserService userService;

    private Mapper<UserEntity, UserDto> userMapper;


    @GetMapping("/all")
    public List<UserDto> getUsers(){
        List<UserEntity> users = userService.getUsers();
        return users.stream().map(userMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping
    public Response getCurrentUser(){
        UserEntity userEntity = userService.getCurrentUser();
        UserDto userDto = userMapper.mapTo(userEntity);
        return Response.ok(userDto, "Current user retrieved successfully!");
    }


    @GetMapping(path="/{username}")
    public Response getUserByUsername(@PathVariable("username") String username){
        Optional<UserEntity> foundUser = userService.findOneByUsername(username);
        return foundUser.map(userEntity -> {
            UserDto userDto = userMapper.mapTo(userEntity);
            return Response.ok(userDto, "User retrieved successfully!");
        }).orElse(
                Response.failed(HttpStatus.NOT_FOUND, "User <" + username + "> doesn't exist!")
        );
    }

    @DeleteMapping(path="/{id}")
    public Response deleteUser(
            @PathVariable("id") UUID id,
            @RequestBody UserDto userDto) {
        Optional<UserEntity> foundUser = userService.findOneByUsername(userDto.getUsername());
        if (foundUser.isPresent()) {
            if (foundUser.get().getId().equals(id)){
                return Response.failed(HttpStatus.BAD_REQUEST ,"You can't delete yourself!");
            }
            if (foundUser.get().getRole().equals(Role.ADMIN)){
                userService.delete(id);
                return Response.ok(null, "User with id <" + id + "> deleted successfully!");
            } else {
                return Response.failed(HttpStatus.BAD_REQUEST, "Unauthorized action performed - need ADMIN permission!");
            }
        } else {
            return Response.failed(HttpStatus.BAD_REQUEST, "Action performed failed!");
        }
    }

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }
}
