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
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByShop(@PathVariable UUID shopId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByShop(shopId));
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
