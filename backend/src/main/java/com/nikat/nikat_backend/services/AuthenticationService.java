package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.dtos.AuthRequest;
import com.nikat.nikat_backend.dtos.AuthResponse;
import com.nikat.nikat_backend.entities.Role;
import com.nikat.nikat_backend.entities.User;
import com.nikat.nikat_backend.repositories.UserRepository;
import com.nikat.nikat_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        if (user.isBlocked()) {
            throw new RuntimeException("User account is blocked.");
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .photoUrl(user.getPhotoUrl())
                .build();
    }

    // Seed admin if doesn't exist
    public void seedAdmin() {
        if (repository.findByEmail("admin").isEmpty()) {
            var admin = User.builder()
                    .firstName("Super")
                    .lastName("Admin")
                    .email("admin")
                    .password(passwordEncoder.encode("admin")) // Hardcoded as per requirement
                    .phone("0000000000")
                    .role(Role.ADMIN)
                    .isEmailVerified(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            repository.save(admin);
        }
    }
}
