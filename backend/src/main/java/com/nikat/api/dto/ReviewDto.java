package com.nikat.api.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private UUID id;
    private String reviewerId;
    private String reviewerName;
    private String shopId;
    private String shopName;
    private String serviceId;
    private Integer rating;
    private String comment;
    private String status;
    private LocalDateTime createdAt;
}
