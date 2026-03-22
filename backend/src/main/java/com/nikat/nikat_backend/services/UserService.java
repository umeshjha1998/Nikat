package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.dtos.RegistrationRequest;
import com.nikat.nikat_backend.entities.Role;
import com.nikat.nikat_backend.entities.User;
import com.nikat.nikat_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(RegistrationRequest request, String photoUrl) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new RuntimeException("Phone number already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
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
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .photoUrl(photoUrl)
                .isEmailVerified(false) // Normally false until OTP is verified
                .isBlocked(false)
                .build();

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
