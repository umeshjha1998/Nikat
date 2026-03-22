package com.nikat.nikat_backend.controllers;

import com.nikat.nikat_backend.dtos.RegistrationRequest;
import com.nikat.nikat_backend.entities.User;
import com.nikat.nikat_backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/auth/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> register(
            @Valid @RequestPart("data") RegistrationRequest request,
            @RequestPart("photo") MultipartFile photo
    ) {
        // Normally we upload the photo to S3/Cloudinary. For now, mocking URL
        // Max size 1MB validation should be done
        if(photo.getSize() > 1048576) {
           return ResponseEntity.badRequest().build();
        }

        String photoUrl = "mock-url/" + photo.getOriginalFilename();
        return ResponseEntity.ok(userService.registerUser(request, photoUrl));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
