package com.nikat.api.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "shop_photos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @Column(name = "photo_data", columnDefinition = "TEXT", nullable = false)
    private String photoData;

    @Column(name = "is_main")
    private Boolean isMain;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (isMain == null) isMain = false;
    }
}
