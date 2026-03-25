package com.nikat.api.service;

import com.nikat.api.domain.Appointment;
import com.nikat.api.dto.AppointmentDto;
import com.nikat.api.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public List<AppointmentDto> getAppointmentsByShop(UUID shopId) {
        return appointmentRepository.findByShopId(shopId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public AppointmentDto updateStatus(UUID appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return mapToDto(appointmentRepository.save(appointment));
    }

    private AppointmentDto mapToDto(Appointment appointment) {
        return AppointmentDto.builder()
                .id(appointment.getId())
                .userId(appointment.getUser().getId())
                .userName(appointment.getUser().getFirstName() + " " + (appointment.getUser().getLastName() != null ? appointment.getUser().getLastName() : ""))
                .shopId(appointment.getShop().getId())
                .shopName(appointment.getShop().getName())
                .appointmentTime(appointment.getAppointmentTime())
                .serviceType(appointment.getServiceType())
                .status(appointment.getStatus())
                .notes(appointment.getNotes())
                .build();
    }
}
