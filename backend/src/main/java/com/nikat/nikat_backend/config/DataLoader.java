package com.nikat.nikat_backend.config;

import com.nikat.nikat_backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final AuthenticationService authenticationService;

    @Override
    public void run(String... args) throws Exception {
        authenticationService.seedAdmin();
    }
}
