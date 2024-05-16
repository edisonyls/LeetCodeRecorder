package com.yls.ylslc.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String username;
    private String sex;
    private String mobileNumber;
    private String personalInfo;
    private LocalDateTime createdAt;
}
