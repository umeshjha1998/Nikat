package com.nikat.api.controller;

import com.nikat.api.dto.UserDto;
import com.nikat.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PatchMapping("/admin/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUserStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(userService.updateUserStatus(id, status));
    }

    @PatchMapping("/admin/users/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUserRole(@PathVariable String id, @RequestParam String role) {
        return ResponseEntity.ok(userService.updateUserRole(id, role));
    }

    @PatchMapping("/users/{id}/profile")
    public ResponseEntity<UserDto> updateProfile(@PathVariable String id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.updateProfile(id, dto));
    }

    @PatchMapping("/users/{id}/password")
    public ResponseEntity<Void> updatePassword(@PathVariable String id, @RequestBody Map<String, String> passwords) {
        userService.updatePassword(id, passwords.get("currentPassword"), passwords.get("newPassword"));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/stats/users/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getUserCount() {
        return ResponseEntity.ok(Map.of("count", userService.getUserCount()));
    }
}
