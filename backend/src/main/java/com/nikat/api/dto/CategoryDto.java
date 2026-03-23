package com.nikat.api.dto;

import lombok.*;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private UUID id;
    private String name;
    private String description;
    private Boolean isServiceCategory;
    private Boolean isShopCategory;
}
