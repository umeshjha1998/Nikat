package com.nikat.api.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceOfferingDto {
    private UUID id;
    private String serviceId;
    private String shopId;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer durationMinutes;
    private String status;
}
