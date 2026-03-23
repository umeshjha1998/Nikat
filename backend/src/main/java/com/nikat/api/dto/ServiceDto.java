package com.nikat.api.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {
    private UUID id;
    private UUID providerId;
    private String providerName;
    private String name;
    private String categoryName;
    private UUID categoryId;
    private String description;
    private String serviceArea;
    private LocalTime startTime;
    private LocalTime endTime;
    private BigDecimal baseCharge;
    private String status;
    private Boolean isFeatured;
}
