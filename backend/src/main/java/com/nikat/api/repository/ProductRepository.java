package com.nikat.api.repository;

import com.nikat.api.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByShopId(String shopId);
    List<Product> findByShopIdAndIsAvailableTrue(String shopId);
}
