package com.nikat.api.repository;

import com.nikat.api.domain.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShopRepository extends JpaRepository<Shop, UUID> {
    List<Shop> findByOwnerId(UUID ownerId);
    List<Shop> findByStatus(String status);
}
