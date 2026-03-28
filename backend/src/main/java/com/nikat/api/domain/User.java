package com.nikat.api.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Column(nullable = false, length = 20, unique = true)
    private String phone;

    @Column(nullable = false, length = 150, unique = true)
    private String email;

    @Column(length = 20)
    private String gender;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "aadhar_number", length = 50)
    private String aadharNumber;

    @Column(name = "pan_number", length = 20)
    private String panNumber;

    @Column(name = "passport_number", length = 50)
    private String passportNumber;

    @Column(length = 50)
    private String role;

    @Column(name = "is_shop_owner")
    private Boolean isShopOwner;

    @Column(name = "is_service_provider")
    private Boolean isServiceProvider;

    @Column(length = 50)
    private String status;

    @Column(name = "email_verified")
    private Boolean emailVerified;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (role == null)
            role = "USER";
        if (status == null)
            status = "PENDING_VERIFICATION";
        if (isShopOwner == null)
            isShopOwner = false;
        if (isServiceProvider == null)
            isServiceProvider = false;
        if (emailVerified == null)
            emailVerified = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
