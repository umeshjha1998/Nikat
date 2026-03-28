package com.nikat.api.repository;

import com.nikat.api.domain.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, UUID> {
    List<Inquiry> findByShopId(String shopId);
    List<Inquiry> findByUserId(UUID userId);
}
