package com.nikat.api.service;

import com.nikat.api.domain.Shop;
import com.nikat.api.domain.ShopPhoto;
import com.nikat.api.dto.ShopDto;
import com.nikat.api.repository.ShopPhotoRepository;
import com.nikat.api.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import com.nikat.api.security.IdGenerator;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopPhotoRepository shopPhotoRepository;
    private final com.nikat.api.repository.UserRepository userRepository;
    private final com.nikat.api.repository.CategoryRepository categoryRepository;
    private final com.nikat.api.repository.ProductRepository productRepository;
    private final ObjectMapper objectMapper;
    private final IdGenerator idGenerator;

    public List<ShopDto> getAllShops() {
        return shopRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ShopDto getShopById(String id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
        return mapToDto(shop);
    }

    public List<ShopDto> getShopsByOwner(String ownerId) {
        return shopRepository.findByOwnerIdOrderByUpdatedAtDesc(ownerId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<ShopDto> getShopsByStatus(String status) {
        return shopRepository.findByStatus(status).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ShopDto createShop(ShopDto dto) {
        com.nikat.api.domain.User owner = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getOwnerId()));
        
        // Generate custom ID: YEAR-MONTH-count
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime monthStart = LocalDateTime.of(now.getYear(), now.getMonth(), 1, 0, 0);
        long count = shopRepository.countByCreatedAtAfter(monthStart);
        String customId = idGenerator.generateShopOrServiceId(count);

        Shop shop = Shop.builder()
                .id(customId)
                .name(dto.getName())
                .owner(owner)
                .description(dto.getDescription())
                .address(dto.getAddress())
                .status("PENDING_VERIFICATION")
                .isFeatured(false)
                .build();
        
        return mapToDto(shopRepository.save(shop));
    }

    public ShopDto updateShopStatus(String id, String status) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
        shop.setStatus(status);
        return mapToDto(shopRepository.save(shop));
    }

    public void uploadShopPhoto(String shopId, String photoData) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + shopId));
        ShopPhoto photo = ShopPhoto.builder()
                .shop(shop)
                .photoData(photoData)
                .build();
        shopPhotoRepository.save(photo);
    }

    public ShopDto updateShop(String id, ShopDto dto) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
        
        shop.setName(dto.getName());
        
        // Validation: number of names depends on worker count
        if (dto.getWorkerNames() != null && !dto.getWorkerNames().trim().isEmpty()) {
            String[] namesArr = dto.getWorkerNames().split(",");
            int count = (int) java.util.Arrays.stream(namesArr).filter(n -> !n.trim().isEmpty()).count();
            if (count > dto.getWorkerCount()) {
                throw new RuntimeException("You cannot provide more than " + dto.getWorkerCount() + " worker names.");
            }
        }

        shop.setWorkerCount(dto.getWorkerCount());
        shop.setWorkerNames(dto.getWorkerNames());
        shop.setDescription(dto.getDescription());
        shop.setAddress(dto.getAddress());
        shop.setOpeningHours(dto.getOpeningHours());
        shop.setOpeningTime(dto.getOpeningTime());
        shop.setClosingTime(dto.getClosingTime());

        if (dto.getCategoryId() != null) {
            shop.setCategory(categoryRepository.findById(dto.getCategoryId())
                    .orElse(null));
        } else {
            shop.setCategory(null);
        }

        shop.setOurStory(dto.getOurStory());
        shop.setAmenities(dto.getAmenities());
        shop.setDailyHours(dto.getDailyHours());
        shop.setPhoneNumber(dto.getPhoneNumber());
        shop.setLatitude(dto.getLatitude());
        shop.setLongitude(dto.getLongitude());

        return mapToDto(shopRepository.save(shop));
    }

    public boolean isShopOwner(String shopId, String email) {
        return shopRepository.findById(shopId)
                .map(shop -> shop.getOwner().getEmail().equals(email))
                .orElse(false);
    }

    private ShopDto mapToDto(Shop shop) {
        boolean isOpen = calculateIsShopOpen(shop.getDailyHours());
        
        java.math.BigDecimal startPrice = productRepository.findByShopIdAndIsAvailableTrue(shop.getId())
                .stream()
                .map(com.nikat.api.domain.Product::getPrice)
                .filter(java.util.Objects::nonNull)
                .min(java.math.BigDecimal::compareTo)
                .orElse(null);

        return ShopDto.builder()
                .id(shop.getId())
                .ownerId(shop.getOwner().getId())
                .ownerName(shop.getOwner().getFirstName() + " " + (shop.getOwner().getLastName() != null ? shop.getOwner().getLastName() : ""))
                .name(shop.getName())
                .categoryName(shop.getCategory() != null ? shop.getCategory().getName() : null)
                .categoryId(shop.getCategory() != null ? shop.getCategory().getId() : null)
                .workerCount(shop.getWorkerCount())
                .workerNames(shop.getWorkerNames())
                .description(shop.getDescription())
                .address(shop.getAddress())
                .openingHours(shop.getOpeningHours())
                .openingTime(shop.getOpeningTime())
                .closingTime(shop.getClosingTime())
                .status(shop.getStatus())
                .isFeatured(shop.getIsFeatured())
                .photos(shopPhotoRepository.findByShopId(shop.getId()).stream().map(ShopPhoto::getPhotoData).collect(Collectors.toList()))
                .ourStory(shop.getOurStory())
                .amenities(shop.getAmenities())
                .dailyHours(shop.getDailyHours())
                .isOpen(isOpen)
                .startingPrice(startPrice)
                .phoneNumber(shop.getPhoneNumber())
                .latitude(shop.getLatitude())
                .longitude(shop.getLongitude())
                .build();
    }

    private boolean calculateIsShopOpen(String dailyHoursJson) {
        if (dailyHoursJson == null || dailyHoursJson.isEmpty()) {
            return false;
        }

        try {
            List<DailyHour> hours = objectMapper.readValue(dailyHoursJson, new TypeReference<List<DailyHour>>() {});
            LocalDateTime now = LocalDateTime.now();
            String currentDay = now.getDayOfWeek().name();
            String yesterdayDay = now.minusDays(1).getDayOfWeek().name();
            LocalTime currentTime = now.toLocalTime();
            
            // Check today's shift and yesterday's overnight shift
            for (DailyHour h : hours) {
                if (h.isClosed() || h.getTime() == null || !h.getTime().contains(" - ")) continue;
                
                String[] parts = h.getTime().split(" - ");
                LocalTime openTime = parseTime(parts[0]);
                LocalTime closeTime = parseTime(parts[1]);

                if (h.getDay().equalsIgnoreCase(currentDay)) {
                    // Normal shift or today's late-night portion
                    if (openTime.isBefore(closeTime)) {
                        if (!currentTime.isBefore(openTime) && !currentTime.isAfter(closeTime)) return true;
                    } else {
                        // Overnight: Open until midnight OR already after open time
                        if (!currentTime.isBefore(openTime) || currentTime.isBefore(closeTime)) return true;
                    }
                } else if (h.getDay().equalsIgnoreCase(yesterdayDay)) {
                    // Check if yesterday's shift was overnight and we are currently in its morning portion
                    if (openTime.isAfter(closeTime) && currentTime.isBefore(closeTime)) return true;
                }
            }
        } catch (Exception e) {
            // Ignore parse errors
        }
        return false;
    }

    private LocalTime parseTime(String timeStr) {
        try {
            // Expecting "6:00 AM" or "06:00 AM"
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH);
            return LocalTime.parse(timeStr.toUpperCase(), formatter);
        } catch (Exception e) {
            try {
                // Fallback for HH:mm format if any
                return LocalTime.parse(timeStr);
            } catch (Exception e2) {
                return LocalTime.MIDNIGHT;
            }
        }
    }

    @lombok.Data
    public static class DailyHour {
        private String day;
        private String time;
        private boolean closed;
    }
}
