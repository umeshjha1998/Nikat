package com.nikat.api.service;

import com.nikat.api.domain.User;
import com.nikat.api.dto.UserDto;
import com.nikat.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UserDto getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToDto(user);
    }

    public UserDto updateUserStatus(String id, String status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setStatus(status);
        return mapToDto(userRepository.save(user));
    }

    public UserDto updateUserRole(String id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setRole(role);
        user.setIsShopOwner("SHOP_OWNER".equals(role) || "DUAL".equals(role));
        user.setIsServiceProvider("SERVICE_PROVIDER".equals(role) || "DUAL".equals(role));
        return mapToDto(userRepository.save(user));
    }

    public UserDto updateProfile(String id, UserDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setAadharNumber(dto.getAadharNumber());
        user.setPanNumber(dto.getPanNumber());
        user.setPassportNumber(dto.getPassportNumber());
        user.setPhotoData(dto.getPhotoData());
        return mapToDto(userRepository.save(user));
    }

    public void updatePassword(String id, String currentPassword, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Invalid current password");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public long getUserCount() {
        return userRepository.count();
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .role(user.getRole())
                .isShopOwner(user.getIsShopOwner())
                .isServiceProvider(user.getIsServiceProvider())
                .status(user.getStatus())
                .aadharNumber(user.getAadharNumber())
                .panNumber(user.getPanNumber())
                .passportNumber(user.getPassportNumber())
                .photoData(user.getPhotoData())
                .build();
    }
}
