package com.nikat.api.controller;

import com.nikat.api.dto.ShopDto;
import com.nikat.api.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping("/public/shops")
    public ResponseEntity<List<ShopDto>> getAllShops() {
        return ResponseEntity.ok(shopService.getAllShops());
    }

    @GetMapping("/public/shops/{id}")
    public ResponseEntity<ShopDto> getShopById(@PathVariable UUID id) {
        return ResponseEntity.ok(shopService.getShopById(id));
    }

    @GetMapping("/shops/owner/{ownerId}")
    public ResponseEntity<List<ShopDto>> getShopsByOwner(@PathVariable UUID ownerId) {
        return ResponseEntity.ok(shopService.getShopsByOwner(ownerId));
    }

    @PatchMapping("/admin/shops/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShopDto> updateShopStatus(@PathVariable UUID id, @RequestParam String status) {
        return ResponseEntity.ok(shopService.updateShopStatus(id, status));
    }

    @PutMapping("/shops/{id}")
    public ResponseEntity<ShopDto> updateShop(@PathVariable UUID id, @RequestBody ShopDto shopDto) {
        return ResponseEntity.ok(shopService.updateShop(id, shopDto));
    }

    @PostMapping("/shops/{id}/photos")
    public ResponseEntity<Void> uploadPhoto(@PathVariable UUID id, @RequestBody String photoData) {
        shopService.uploadShopPhoto(id, photoData);
        return ResponseEntity.ok().build();
    }
}
