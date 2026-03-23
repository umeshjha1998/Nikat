package com.nikat.nikat_backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "community_posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    private String locality; // Janta Flat, LIG flats, etc.

    @Column(nullable = false)
    private String postType; // Review, Game, CabPool, Marketplace, HostedRoom, Issue, etc.

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ElementCollection
    private List<String> imageUrls;

    // Additional fields like price for marketplace, time for cab pool, etc.
    private Double price;
    private LocalDateTime eventTime;

    @Builder.Default
    private boolean isApproved = false;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
