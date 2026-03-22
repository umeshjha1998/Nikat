package com.nikat.nikat_backend.dtos;

import com.nikat.nikat_backend.entities.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegistrationRequest {
    @NotBlank
    private String firstName;
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String password;

    @NotBlank
    private String gender;

    @NotBlank
    private String permanentAddress;

    // Location/GPS specific
    private String baseLocation;
    private Double latitude;
    private Double longitude;

    private String flatNumber;
    private String nearbyLandmark;
    private String floorDetails;

    private String aadharNumber;
    private String panNumber;
    private String passportNumber;

    @NotNull
    private Role role; // USER, SHOP_OWNER, SERVICE_PROVIDER, SHOP_AND_SERVICE

    // Only needed if they are creating a Shop or Service concurrently
    // Let's assume for MVP they create listings via separate endpoints after registration
}
