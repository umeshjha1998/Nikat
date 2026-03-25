package com.nikat.api.service;

import com.nikat.api.domain.Shop;
import com.nikat.api.domain.ShopPhoto;
import com.nikat.api.dto.ShopDto;
import com.nikat.api.repository.ShopPhotoRepository;
import com.nikat.api.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopPhotoRepository shopPhotoRepository;

    public List<ShopDto> getAllShops() {
        return shopRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ShopDto getShopById(UUID id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
        return mapToDto(shop);
    }

    public List<ShopDto> getShopsByOwner(UUID ownerId) {
        return shopRepository.findByOwnerId(ownerId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<ShopDto> getShopsByStatus(String status) {
        return shopRepository.findByStatus(status).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ShopDto updateShopStatus(UUID id, String status) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
        shop.setStatus(status);
        return mapToDto(shopRepository.save(shop));
    }

    public void uploadShopPhoto(UUID shopId, String photoData) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + shopId));
        ShopPhoto photo = ShopPhoto.builder()
                .shop(shop)
                .photoData(photoData)
                .build();
        shopPhotoRepository.save(photo);
    }

    public ShopDto updateShop(UUID id, ShopDto dto) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
        
        shop.setName(dto.getName());
        shop.setWorkerCount(dto.getWorkerCount());
        shop.setDescription(dto.getDescription());
        shop.setAddress(dto.getAddress());
        shop.setOpeningHours(dto.getOpeningHours());
        
        return mapToDto(shopRepository.save(shop));
    }

    private ShopDto mapToDto(Shop shop) {
        return ShopDto.builder()
                .id(shop.getId())
                .ownerId(shop.getOwner().getId())
                .ownerName(shop.getOwner().getFirstName() + " " + (shop.getOwner().getLastName() != null ? shop.getOwner().getLastName() : ""))
                .name(shop.getName())
                .categoryName(shop.getCategory() != null ? shop.getCategory().getName() : null)
                .categoryId(shop.getCategory() != null ? shop.getCategory().getId() : null)
                .workerCount(shop.getWorkerCount())
                .description(shop.getDescription())
                .address(shop.getAddress())
                .openingHours(shop.getOpeningHours())
                .status(shop.getStatus())
                .isFeatured(shop.getIsFeatured())
                .photos(shopPhotoRepository.findByShopId(shop.getId()).stream().map(ShopPhoto::getPhotoData).collect(Collectors.toList()))
                .build();
    }
}
