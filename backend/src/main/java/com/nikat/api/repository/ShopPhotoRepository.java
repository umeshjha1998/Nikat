package com.nikat.api.repository;

import com.nikat.api.domain.ShopPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShopPhotoRepository extends JpaRepository<ShopPhoto, UUID> {
    List<ShopPhoto> findByShopId(String shopId);
}
