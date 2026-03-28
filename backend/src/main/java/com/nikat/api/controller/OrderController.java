package com.nikat.api.controller;

import com.nikat.api.domain.User;
import com.nikat.api.dto.OrderDto;
import com.nikat.api.service.AuthService;
import com.nikat.api.service.ShopOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final ShopOrderService orderService;
    private final AuthService authService;

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
            @RequestParam String shopId, 
            @RequestParam(required = false) String query) {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(orderService.getShopOrders(shopId, currentUser, query));
    }

    @PatchMapping("/{orderId}/status")
    @PreAuthorize("hasRole('SHOP_OWNER')")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable String orderId, @RequestBody String status) {
        // Remove quotes if present from raw string body
        status = status.replace("\"", "");
        return ResponseEntity.ok(orderService.updateStatus(orderId, status));
    }
}
