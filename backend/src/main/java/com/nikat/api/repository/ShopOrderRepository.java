package com.nikat.api.repository;

import com.nikat.api.domain.ShopOrder;
import com.nikat.api.domain.User;
import com.nikat.api.domain.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShopOrderRepository extends JpaRepository<ShopOrder, String> {
    long countByCreatedAtAfter(LocalDateTime date);
    List<ShopOrder> findByCustomerOrderByCreatedAtDesc(User customer);
    
    List<ShopOrder> findByShopOrderByCreatedAtDesc(Shop shop);

    @Query("SELECT DISTINCT o FROM ShopOrder o LEFT JOIN o.items i LEFT JOIN o.customer c " +
           "WHERE o.shop = :shop AND (" +
           ":query IS NULL OR :query = '' OR " +
           "LOWER(c.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(i.product.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "CAST(o.id AS string) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "ORDER BY o.createdAt DESC")
    List<ShopOrder> searchByShop(@Param("shop") Shop shop, @Param("query") String query);
}
