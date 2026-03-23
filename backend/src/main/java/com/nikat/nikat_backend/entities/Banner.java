package com.nikat.nikat_backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "banners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false)
    private String imageUrl;

    private String targetUrl;

    private int displayOrder;

    @Builder.Default
    private boolean isActive = true;
}
