package com.nikat.api.service;

import com.nikat.api.domain.Product;
import com.nikat.api.dto.ProductDto;
import com.nikat.api.repository.ProductRepository;
import com.nikat.api.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    private final ShopRepository shopRepository;

    public List<ProductDto> getProductsByShop(UUID shopId) {
        return productRepository.findByShopId(shopId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ProductDto createProduct(ProductDto dto) {
        var shop = shopRepository.findById(dto.getShopId())
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + dto.getShopId()));
        
        Product product = Product.builder()
                .shop(shop)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .isAvailable(dto.getIsAvailable())
                .imageUrl(dto.getImageUrl())
                .quantity(dto.getQuantity() != null ? dto.getQuantity() : 0L)
                .build();
        
        return mapToDto(productRepository.save(product));
    }

    public ProductDto updateProduct(UUID id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setIsAvailable(dto.getIsAvailable());
        product.setImageUrl(dto.getImageUrl());
        product.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : product.getQuantity());
        return mapToDto(productRepository.save(product));
    }

    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
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
                .quantity(product.getQuantity())
                .build();
    }
}
