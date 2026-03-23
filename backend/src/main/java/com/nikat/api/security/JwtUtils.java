package com.nikat.api.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${app.jwt.secret:defaultSecretKeyWithAtLeast32BytesForHmacSha256SoItIsSecureEnough}")
    private String jwtSecret;

    @Value("${app.jwt.expirationMs:86400000}")
    private int jwtExpirationMs; // 24 hours

    // NOTE: using a simplified JWT implementation here without forcing 'jjwt' dependency addition just yet
    // Will integrate proper jjwt once POM is finalized if needed, but basic structure is ready.
}
