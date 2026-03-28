package com.nikat.api.service;

import com.nikat.api.domain.Review;
import com.nikat.api.domain.Shop;
import com.nikat.api.domain.User;
import com.nikat.api.domain.CommunityPost;
import com.nikat.api.dto.ReviewDto;
import com.nikat.api.repository.ReviewRepository;
import com.nikat.api.repository.ShopRepository;
import com.nikat.api.repository.UserRepository;
import com.nikat.api.repository.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ShopRepository shopRepository;
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;

    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<ReviewDto> getReviewsByShop(String shopId) {
        return reviewRepository.findByShopIdAndStatus(shopId, "ACTIVE").stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ReviewDto getReviewById(UUID id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        return mapToDto(review);
    }

    public ReviewDto createReview(ReviewDto reviewDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User reviewer = userRepository.findByEmail(username)
                .or(() -> userRepository.findByPhone(username))
                .orElseThrow(() -> new RuntimeException("Logged in user not found"));

        Review review = Review.builder()
                .reviewer(reviewer)
                .rating(reviewDto.getRating())
                .comment(reviewDto.getComment())
                .status("ACTIVE")
                .build();

        if (reviewDto.getShopId() != null) {
            Shop shop = shopRepository.findById(reviewDto.getShopId()).orElse(null);
            review.setShop(shop);
            
            // Auto-create community post for the review
            CommunityPost post = CommunityPost.builder()
                    .author(reviewer)
                    .postType("REVIEW")
                    .title("New Review for " + shop.getName())
                    .content(review.getComment())
                    .locationArea(shop.getAddress())
                    .status("ACTIVE")
                    .build();
            communityPostRepository.save(post);
        }

        return mapToDto(reviewRepository.save(review));
    }

    public ReviewDto updateReviewStatus(UUID id, String status) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        review.setStatus(status);
        return mapToDto(reviewRepository.save(review));
    }

    private ReviewDto mapToDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .reviewerId(review.getReviewer().getId())
                .reviewerName(review.getReviewer().getFirstName() + " " + (review.getReviewer().getLastName() != null ? review.getReviewer().getLastName() : ""))
                .shopId(review.getShop() != null ? review.getShop().getId() : null)
                .shopName(review.getShop() != null ? review.getShop().getName() : null)
                .serviceId(review.getService() != null ? review.getService().getId() : null)
                .rating(review.getRating())
                .comment(review.getComment())
                .status(review.getStatus())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
