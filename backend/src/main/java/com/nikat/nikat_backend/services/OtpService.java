package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.entities.Otp;
import com.nikat.nikat_backend.repositories.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    public void generateAndSendOtp(String email) {
        String otpCode = String.format("%06d", new Random().nextInt(999999));

        Otp otp = Otp.builder()
                .email(email)
                .otpCode(otpCode)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .used(false)
                .build();
        
        otpRepository.save(otp);
        emailService.sendOtpEmail(email, otpCode);
    }

    public boolean verifyOtp(String email, String otpCode) {
        return otpRepository.findTopByEmailAndUsedFalseOrderByExpiryTimeDesc(email)
                .map(otp -> {
                    if (otp.getOtpCode().equals(otpCode) && otp.getExpiryTime().isAfter(LocalDateTime.now())) {
                        otp.setUsed(true);
                        otpRepository.save(otp);
                        return true;
                    }
                    return false;
                }).orElse(false);
    }
}
