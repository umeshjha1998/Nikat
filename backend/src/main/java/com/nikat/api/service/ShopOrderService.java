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

    public List<OrderDto> getShopOrders(Shop shop) {
        return orderRepository.findByShopOrderByCreatedAtDesc(shop)
                .stream().map(this::mapToDto).collect(Collectors.toList());
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
