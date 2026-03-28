package com.nikat.api.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityPostDto {
    private UUID id;
    private String authorId;
    private String authorName;
    private String postType;
    private String title;
    private String content;
    private String locationArea;
    private String status;
    private LocalDateTime createdAt;
}
