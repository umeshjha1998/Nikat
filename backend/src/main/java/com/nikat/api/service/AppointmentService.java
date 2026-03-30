package com.nikat.api.service;

import com.nikat.api.domain.Appointment;
import com.nikat.api.dto.AppointmentDto;
import com.nikat.api.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final com.nikat.api.repository.UserRepository userRepository;
    private final com.nikat.api.repository.ShopRepository shopRepository;
    private final com.nikat.api.repository.ServiceRepository serviceRepository;

    public List<AppointmentDto> getAppointmentsByShop(String shopId) {
        return appointmentRepository.findByShopIdOrderByAppointmentTimeAsc(shopId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<AppointmentDto> getAppointmentsByService(String serviceId) {
        return appointmentRepository.findByServiceIdOrderByAppointmentTimeAsc(serviceId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<com.nikat.api.dto.UserDto> getClientsByService(String serviceId) {
        // Find unique clients (Users) who have booked this service
        return appointmentRepository.findByServiceIdOrderByAppointmentTimeAsc(serviceId).stream()
                .map(Appointment::getUser)
                .distinct()
                .map(user -> com.nikat.api.dto.UserDto.builder()
                        .id(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .build())
                .collect(Collectors.toList());
    }

    public AppointmentDto updateStatus(UUID appointmentId, String status, String workerName) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        if (workerName != null) {
            appointment.setAssignedWorker(workerName);
        }
        return mapToDto(appointmentRepository.save(appointment));
    }

    public AppointmentDto createAppointment(AppointmentDto dto) {
        com.nikat.api.domain.User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getUserId()));
        
        com.nikat.api.domain.Shop shop = null;
        if (dto.getShopId() != null) {
            shop = shopRepository.findById(dto.getShopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found: " + dto.getShopId()));
        }

        com.nikat.api.domain.Service service = null;
        if (dto.getServiceId() != null) {
            service = serviceRepository.findById(dto.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found: " + dto.getServiceId()));
        }

        LocalTime appointmentLocalTime = dto.getAppointmentTime().toLocalTime();
        
        if (shop != null) {
            if (shop.getOpeningTime() != null && shop.getClosingTime() != null && !shop.getOpeningTime().trim().isEmpty() && !shop.getClosingTime().trim().isEmpty()) {
                try {
                    LocalTime openingTime = LocalTime.parse(shop.getOpeningTime());
                    LocalTime closingTime = LocalTime.parse(shop.getClosingTime());
                    if (appointmentLocalTime.isBefore(openingTime) || appointmentLocalTime.isAfter(closingTime)) {
                        throw new RuntimeException("Appointment time must be between shop opening (" + shop.getOpeningTime() + ") and closing (" + shop.getClosingTime() + ") times.");
                    }
                } catch (DateTimeParseException e) {
                    // Ignore if format is not standard
                }
            }
        } else if (service != null) {
            if (service.getStartTime() != null && service.getEndTime() != null) {
                if (appointmentLocalTime.isBefore(service.getStartTime()) || appointmentLocalTime.isAfter(service.getEndTime())) {
                    throw new RuntimeException("Appointment time must be between service start (" + service.getStartTime() + ") and end (" + service.getEndTime() + ") times.");
                }
            }
        }

        Appointment appointment = Appointment.builder()
                .user(user)
                .shop(shop)
                .service(service)
                .appointmentTime(dto.getAppointmentTime())
                .serviceType(dto.getServiceType())
                .status("PENDING")
                .notes(dto.getNotes())
                .build();

        return mapToDto(appointmentRepository.save(appointment));
    }

    private AppointmentDto mapToDto(Appointment appointment) {
        return AppointmentDto.builder()
                .id(appointment.getId())
                .userId(appointment.getUser().getId())
                .userName(appointment.getUser().getFirstName() + " " + (appointment.getUser().getLastName() != null ? appointment.getUser().getLastName() : ""))
                .shopId(appointment.getShop() != null ? appointment.getShop().getId() : null)
                .shopName(appointment.getShop() != null ? appointment.getShop().getName() : null)
                .serviceId(appointment.getService() != null ? appointment.getService().getId() : null)
                .serviceName(appointment.getService() != null ? appointment.getService().getName() : null)
                .appointmentTime(appointment.getAppointmentTime())
                .serviceType(appointment.getServiceType())
                .status(appointment.getStatus())
                .notes(appointment.getNotes())
                .assignedWorker(appointment.getAssignedWorker())
                .createdAt(appointment.getCreatedAt())
                .build();
    }
}
