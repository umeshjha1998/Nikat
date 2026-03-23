package com.nikat.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {

    @Value("${resend.api.key:stub}")
    private String resendApiKey;

    public void sendOtpEmail(String to, String otp) {
        log.info("Mock sending OTP email to {} with OTP {}", to, otp);
        // TODO: Integrate actual Resend client
    }
}
