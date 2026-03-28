package com.nikat.api.repository;

import com.nikat.api.domain.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ShopRepository extends JpaRepository<Shop, String> {
    long countByCreatedAtAfter(LocalDateTime date);
    List<Shop> findByOwnerIdOrderByUpdatedAtDesc(String ownerId);
    List<Shop> findByStatus(String status);
}
