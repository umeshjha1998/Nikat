package com.nikat.api.controller;

import com.nikat.api.dto.ServiceOfferingDto;
import com.nikat.api.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/service-offerings")
@RequiredArgsConstructor
public class ServiceOfferingController {
    private final ServiceOfferingService offeringService;

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<ServiceOfferingDto>> getByService(@PathVariable String serviceId) {
        return ResponseEntity.ok(offeringService.getOfferingsByService(serviceId));
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<ServiceOfferingDto>> getByShop(@PathVariable String shopId) {
        return ResponseEntity.ok(offeringService.getOfferingsByShop(shopId));
    }

    @PostMapping
    public ResponseEntity<ServiceOfferingDto> create(@RequestBody ServiceOfferingDto dto) {
        return ResponseEntity.ok(offeringService.createOffering(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOfferingDto> update(@PathVariable UUID id, @RequestBody ServiceOfferingDto dto) {
        return ResponseEntity.ok(offeringService.updateOffering(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        offeringService.deleteOffering(id);
        return ResponseEntity.noContent().build();
    }
}
