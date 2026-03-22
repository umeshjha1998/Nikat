package com.nikat.nikat_backend.repositories;

import com.nikat.nikat_backend.entities.Shop;
import com.nikat.nikat_backend.entities.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long>, JpaSpecificationExecutor<Shop> {
    List<Shop> findByStatus(ListingStatus status);
}
