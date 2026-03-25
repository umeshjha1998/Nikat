package com.nikat.api.service;

import com.nikat.api.domain.Product;
import com.nikat.api.dto.ProductDto;
import com.nikat.api.repository.ProductRepository;
import com.nikat.api.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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
                .build();
        
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
                .build();
    }
}
