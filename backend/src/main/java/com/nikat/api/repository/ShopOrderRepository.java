package com.nikat.api.repository;

import com.nikat.api.domain.ShopOrder;
import com.nikat.api.domain.User;
import com.nikat.api.domain.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShopOrderRepository extends JpaRepository<ShopOrder, UUID> {
    List<ShopOrder> findByCustomerOrderByCreatedAtDesc(User customer);
    List<ShopOrder> findByShopOrderByCreatedAtDesc(Shop shop);
}
