package com.nikat.api.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    private UUID id;
    private String userId;
    private String userName;
    private String shopId;
    private String shopName;
    private String serviceId;
    private String serviceName;
    private LocalDateTime appointmentTime;
    private String serviceType;
    private String status;
    private String notes;
    private String assignedWorker;
    private LocalDateTime createdAt;
}
