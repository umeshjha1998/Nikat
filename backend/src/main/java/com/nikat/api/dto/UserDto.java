package com.nikat.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String role;
    private Boolean isShopOwner;
    private Boolean isServiceProvider;
    private String status;
    private String aadharNumber;
    private String panNumber;
    private String passportNumber;
    private String photoData;
    private Double latitude;
    private Double longitude;
}
