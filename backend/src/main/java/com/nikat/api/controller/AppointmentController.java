package com.nikat.api.controller;

import com.nikat.api.dto.AppointmentDto;
import com.nikat.api.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByShop(@PathVariable String shopId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByShop(shopId));
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByService(@PathVariable String serviceId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByService(serviceId));
    }

    @GetMapping("/service/{serviceId}/clients")
    public ResponseEntity<List<com.nikat.api.dto.UserDto>> getClientsByService(@PathVariable String serviceId) {
        return ResponseEntity.ok(appointmentService.getClientsByService(serviceId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AppointmentDto> updateStatus(
            @PathVariable UUID id, 
            @RequestParam String status,
            @RequestParam(required = false) String workerName) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status, workerName));
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto dto) {
        return ResponseEntity.ok(appointmentService.createAppointment(dto));
    }
}
