package com.nikat.api.service;

import com.nikat.api.domain.Product;
import com.nikat.api.dto.ProductDto;
import com.nikat.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductDto> getProductsByShop(UUID shopId) {
        return productRepository.findByShopId(shopId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ProductDto mapToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .shopId(product.getShop().getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .isAvailable(product.getIsAvailable())
                .imageUrl(product.getImageUrl())
                .build();
    }
}
