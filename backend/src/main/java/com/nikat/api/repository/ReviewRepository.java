package com.nikat.api.repository;

import com.nikat.api.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID>, ReviewRepositoryCustom {
    List<Review> findByShopIdAndStatus(String shopId, String status);
    List<Review> findByServiceIdAndStatus(String serviceId, String status);
}
