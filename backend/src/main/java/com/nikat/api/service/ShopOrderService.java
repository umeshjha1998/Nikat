package com.nikat.api.service;

import com.nikat.api.domain.*;
import com.nikat.api.dto.OrderDto;
import com.nikat.api.dto.OrderItemDto;
import com.nikat.api.repository.ProductRepository;
import com.nikat.api.repository.ShopOrderRepository;
import com.nikat.api.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopOrderService {

    private final ShopOrderRepository orderRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderDto createOrder(User customer, OrderDto orderDto) {
        Shop shop = shopRepository.findById(orderDto.getShopId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        ShopOrder order = ShopOrder.builder()
                .customer(customer)
                .shop(shop)
                .totalAmount(orderDto.getTotalAmount())
                .paymentMethod(orderDto.getPaymentMethod())
                .shippingAddress(orderDto.getShippingAddress())
                .contactPhone(orderDto.getContactPhone())
                .status("PENDING")
                .build();

        List<OrderItem> items = orderDto.getItems().stream().map(itemDto -> {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .unitPrice(itemDto.getUnitPrice())
                    .totalPrice(itemDto.getTotalPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);
        ShopOrder savedOrder = orderRepository.save(order);
        return mapToDto(savedOrder);
    }

    public List<OrderDto> getCustomerOrders(User user) {
        return orderRepository.findByCustomerOrderByCreatedAtDesc(user)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<OrderDto> getShopOrders(Shop shop, String query) {
        if (query == null || query.trim().isEmpty()) {
            return orderRepository.findByShopOrderByCreatedAtDesc(shop)
                    .stream().map(this::mapToDto).collect(Collectors.toList());
        }
        return orderRepository.searchByShop(shop, query)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public OrderDto updateStatus(UUID orderId, String status) {
        ShopOrder order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        String oldStatus = order.getStatus();
        
        // Prevent random status changes if not accepted
        if (!status.equals("ACCEPTED") && !status.equals("CANCELLED") && oldStatus.equals("PENDING")) {
             throw new RuntimeException("Order must be ACCEPTED first.");
        }

        // Logic for reducing stock upon acceptance
        if (status.equals("ACCEPTED") && !oldStatus.equals("ACCEPTED")) {
            for (OrderItem item : order.getItems()) {
                Product product = item.getProduct();
                if (product.getQuantity() != null) {
                    if (product.getQuantity() < item.getQuantity()) {
                        throw new RuntimeException("Insufficient stock for product: " + product.getName());
                    }
                    product.setQuantity(product.getQuantity() - item.getQuantity());
                    
                    // Automatically mark as out of stock if quantity reaches 0
                    if (product.getQuantity() <= 0) {
                        product.setIsAvailable(false);
                    }
                    
                    productRepository.save(product);
                }
            }
        }

        order.setStatus(status);
        return mapToDto(order);
    }

    private OrderDto mapToDto(ShopOrder order) {
        return OrderDto.builder()
                .id(order.getId())
                .customerId(order.getCustomer().getId())
                .customerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName())
                .shopId(order.getShop().getId())
                .shopName(order.getShop().getName())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .shippingAddress(order.getShippingAddress())
                .contactPhone(order.getContactPhone())
                .createdAt(order.getCreatedAt())
                .items(order.getItems().stream().map(item -> OrderItemDto.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .totalPrice(item.getTotalPrice())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
