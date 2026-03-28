package com.nikat.api.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private UUID id;
    private String shopId;
    private String shopName;
    private String name;
    private String description;
    private BigDecimal price;
    private Boolean isAvailable;
    private String imageUrl;
    private Long quantity;
}
