package com.nikat.nikat_backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from.email}")
    private String fromEmail;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendOtpEmail(String toEmail, String otpCode) {
        if (resendApiKey == null || resendApiKey.isEmpty()) {
            System.out.println("MOCK EMAIL: Sending OTP " + otpCode + " to " + toEmail);
            return;
        }

        String url = "https://api.resend.com/emails";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(resendApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("from", "Nikat <" + fromEmail + ">");
        requestBody.put("to", List.of(toEmail));
        requestBody.put("subject", "Your Nikat Verification Code");
        requestBody.put("html", "<p>Your verification code is: <strong>" + otpCode + "</strong></p>");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            System.out.println("Resend API Response: " + response.getStatusCode());
        } catch (Exception e) {
            System.err.println("Failed to send email via Resend: " + e.getMessage());
        }
    }
}
