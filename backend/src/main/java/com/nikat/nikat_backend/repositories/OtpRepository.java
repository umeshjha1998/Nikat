package com.nikat.nikat_backend.repositories;

import com.nikat.nikat_backend.entities.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findTopByEmailAndUsedFalseOrderByExpiryTimeDesc(String email);
}
