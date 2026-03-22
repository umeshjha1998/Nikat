package com.nikat.nikat_backend.controllers;

import com.nikat.nikat_backend.entities.Listing;
import com.nikat.nikat_backend.entities.Service;
import com.nikat.nikat_backend.entities.Shop;
import com.nikat.nikat_backend.services.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @GetMapping("/public/listings")
    public ResponseEntity<List<Listing>> getAllActiveListings() {
        return ResponseEntity.ok(listingService.getActiveListings());
    }

    @GetMapping("/admin/shops")
    public ResponseEntity<List<Shop>> getAllShopsAdmin() {
        return ResponseEntity.ok(listingService.getAllShops());
    }

    @GetMapping("/admin/services")
    public ResponseEntity<List<Service>> getAllServicesAdmin() {
        return ResponseEntity.ok(listingService.getAllServices());
    }

    @PostMapping("/listings/shop")
    public ResponseEntity<Shop> createShop(@RequestBody Shop shop) {
        return ResponseEntity.ok(listingService.createShop(shop));
    }

    @PostMapping("/listings/service")
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        return ResponseEntity.ok(listingService.createService(service));
    }
}
