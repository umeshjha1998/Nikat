package com.nikat.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String role;
    private Boolean isShopOwner;
    private Boolean isServiceProvider;
    private String status;
}
