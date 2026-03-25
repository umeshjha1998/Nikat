package com.nikat.api.controller;

import com.nikat.api.dto.ProductDto;
import com.nikat.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<ProductDto>> getProductsByShop(@PathVariable UUID shopId) {
        return ResponseEntity.ok(productService.getProductsByShop(shopId));
    }
}
