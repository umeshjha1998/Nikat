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
    private final OtpService otpService;

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

    public void register(com.nikat.nikat_backend.dtos.RegistrationRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .gender(request.getGender())
                .permanentAddress(request.getPermanentAddress())
                .baseLocation(request.getBaseLocation())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .flatNumber(request.getFlatNumber())
                .nearbyLandmark(request.getNearbyLandmark())
                .floorDetails(request.getFloorDetails())
                .aadharNumber(request.getAadharNumber())
                .panNumber(request.getPanNumber())
                .passportNumber(request.getPassportNumber())
                .role(request.getRole())
                .isEmailVerified(false)
                .isBlocked(false)
                .build();
        repository.save(user);

        otpService.generateAndSendOtp(user.getEmail());
    }

    public AuthResponse verifyOtp(String email, String otp) {
        if (!otpService.verifyOtp(email, otp)) {
            throw new RuntimeException("Invalid or expired OTP");
        }
        var user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setEmailVerified(true);
        repository.save(user);

        // Auto login after verification
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
