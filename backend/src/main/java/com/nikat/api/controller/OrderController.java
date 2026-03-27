package com.nikat.api.controller;

import com.nikat.api.domain.Shop;
import com.nikat.api.domain.User;
import com.nikat.api.dto.OrderDto;
import com.nikat.api.repository.ShopRepository;
import com.nikat.api.service.AuthService;
import com.nikat.api.service.ShopOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final ShopOrderService orderService;
    private final AuthService authService;
    private final ShopRepository shopRepository;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(orderService.createOrder(currentUser, orderDto));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDto>> getMyOrders() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(orderService.getCustomerOrders(currentUser));
    }

    @GetMapping("/received")
    @PreAuthorize("hasRole('SHOP_OWNER')")
    public ResponseEntity<List<OrderDto>> getReceivedOrders(
            @RequestParam UUID shopId, 
            @RequestParam(required = false) String query) {
        User currentUser = authService.getCurrentUser();
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));
        
        // Verify ownership
        if (!shop.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to shop orders");
        }
        
        return ResponseEntity.ok(orderService.getShopOrders(shop, query));
    }

    @PatchMapping("/{orderId}/status")
    @PreAuthorize("hasRole('SHOP_OWNER')")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable UUID orderId, @RequestBody String status) {
        // Remove quotes if present from raw string body
        status = status.replace("\"", "");
        return ResponseEntity.ok(orderService.updateStatus(orderId, status));
    }
}
