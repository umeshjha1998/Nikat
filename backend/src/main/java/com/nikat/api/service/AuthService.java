package com.nikat.api.service;

import com.nikat.api.domain.Shop;
import com.nikat.api.domain.User;
import com.nikat.api.dto.AuthRequest;
import com.nikat.api.dto.AuthResponse;
import com.nikat.api.dto.RegisterRequest;
import com.nikat.api.dto.UserDto;
import com.nikat.api.repository.ServiceRepository;
import com.nikat.api.repository.ShopRepository;
import com.nikat.api.repository.UserRepository;
import com.nikat.api.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final ServiceRepository serviceRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final com.nikat.api.security.IdGenerator idGenerator;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use.");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone is already in use.");
        }

        // Generate custom ID: YEAR-MONTH-count
        java.time.LocalDateTime now = java.time.LocalDateTime.now();
        java.time.LocalDateTime monthStart = java.time.LocalDateTime.of(now.getYear(), now.getMonth(), 1, 0, 0);
        long count = userRepository.countByCreatedAtAfter(monthStart);
        String customId = idGenerator.generateUserId(count);

        User user = User.builder()
                .id(customId)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : "USER")
                .isShopOwner("SHOP_OWNER".equals(request.getRole()))
                .isServiceProvider("SERVICE_PROVIDER".equals(request.getRole()))
                .status("PENDING_VERIFICATION")
                .emailVerified(false)
                .build();

        user = userRepository.save(user);

        // If Merchant, initialize business record
        if ("SHOP_OWNER".equals(user.getRole())) {
            Shop shop = Shop.builder()
                    .owner(user)
                    .name(request.getBusinessName() != null ? request.getBusinessName() : (user.getFirstName() + "'s Shop"))
                    .address(request.getBusinessAddress())
                    .status("PENDING_VERIFICATION")
                    .build();
            shopRepository.save(shop);
        } else if ("SERVICE_PROVIDER".equals(user.getRole())) {
            com.nikat.api.domain.Service nikatService = com.nikat.api.domain.Service.builder()
                    .provider(user)
                    .name(request.getBusinessName() != null ? request.getBusinessName() : (user.getFirstName() + "'s Service"))
                    .serviceArea(request.getBusinessAddress())
                    .status("PENDING_VERIFICATION")
                    .build();
            serviceRepository.save(nikatService);
        }

        // Map to UserDto
        UserDto userDto = mapToUserDto(user);
        
        // Return without token for now, require OTP or login
        return AuthResponse.builder()
                .token(null) // Token generated on login
                .user(userDto)
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmailOrPhone(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Fetch User
        User user = userRepository.findByEmail(request.getEmailOrPhone())
                .orElseGet(() -> userRepository.findByPhone(request.getEmailOrPhone())
                        .orElseThrow(() -> new RuntimeException("User not found")));

        // Generate Token
        String token = jwtUtils.generateJwtToken(authentication);

        UserDto userDto = mapToUserDto(user);

        return AuthResponse.builder()
                .token(token)
                .user(userDto)
                .build();
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User not authenticated");
        }
        return userRepository.findByEmail(authentication.getName())
                .orElseGet(() -> userRepository.findByPhone(authentication.getName())
                        .orElseThrow(() -> new RuntimeException("User not found")));
    }

    private UserDto mapToUserDto(User user) {
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
                .build();
    }
}
