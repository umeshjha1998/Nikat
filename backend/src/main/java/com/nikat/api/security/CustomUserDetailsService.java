package com.nikat.api.security;

import com.nikat.api.domain.User;
import com.nikat.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find by email or phone
        Optional<User> userContent = userRepository.findByEmail(username);
        if (userContent.isEmpty()) {
            userContent = userRepository.findByPhone(username);
        }

        User user = userContent.orElseThrow(() -> 
                new UsernameNotFoundException("User not found with email or phone: " + username)
        );

        return new CustomUserDetails(user);
    }
}
