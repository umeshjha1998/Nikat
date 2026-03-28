package com.nikat.api.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryDto {
    private UUID id;
    private String userId;
    private String userName;
    private String userAvatar;
    private String shopId;
    private String message;
    private String reply;
    private String status;
    private LocalDateTime createdAt;
}
