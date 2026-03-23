package com.nikat.api.controller;

import com.nikat.api.dto.ServiceDto;
import com.nikat.api.service.ServiceProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceProviderService serviceProviderService;

    @GetMapping("/public/services")
    public ResponseEntity<List<ServiceDto>> getAllServices() {
        return ResponseEntity.ok(serviceProviderService.getAllServices());
    }

    @GetMapping("/public/services/{id}")
    public ResponseEntity<ServiceDto> getServiceById(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceProviderService.getServiceById(id));
    }

    @GetMapping("/services/provider/{providerId}")
    public ResponseEntity<List<ServiceDto>> getServicesByProvider(@PathVariable UUID providerId) {
        return ResponseEntity.ok(serviceProviderService.getServicesByProvider(providerId));
    }

    @PatchMapping("/admin/services/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceDto> updateServiceStatus(@PathVariable UUID id, @RequestParam String status) {
        return ResponseEntity.ok(serviceProviderService.updateServiceStatus(id, status));
    }
}
