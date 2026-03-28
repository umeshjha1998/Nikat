package com.nikat.api.dto;

import lombok.*;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopDto {
    private String id;
    private UUID ownerId;
    private String ownerName;
    private String name;
    private String categoryName;
    private UUID categoryId;
    private Integer workerCount;
    private String workerNames;
    private String description;
    private String address;
    private String openingHours;
    private String openingTime;
    private String closingTime;
    private String status;
    private Boolean isFeatured;
    private java.util.List<String> photos;
    private String ourStory;
    private String amenities;
    private String dailyHours;
    private Boolean isOpen;
    private java.math.BigDecimal startingPrice;
    private String phoneNumber;
    private Double latitude;
    private Double longitude;
}
