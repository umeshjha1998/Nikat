package com.nikat.api.controller;

import com.nikat.api.dto.ReviewDto;
import com.nikat.api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/public/reviews")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/public/reviews/shop/{shopId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByShop(@PathVariable String shopId) {
        return ResponseEntity.ok(reviewService.getReviewsByShop(shopId));
    }

    @PostMapping("/reviews")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        return ResponseEntity.ok(reviewService.createReview(reviewDto));
    }

    @GetMapping("/public/reviews/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @PatchMapping("/admin/reviews/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReviewDto> updateReviewStatus(@PathVariable UUID id, @RequestParam String status) {
        return ResponseEntity.ok(reviewService.updateReviewStatus(id, status));
    }
}
