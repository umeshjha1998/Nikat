package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.entities.Listing;
import com.nikat.nikat_backend.entities.ListingStatus;
import com.nikat.nikat_backend.entities.Service;
import com.nikat.nikat_backend.entities.Shop;
import com.nikat.nikat_backend.repositories.ListingRepository;
import com.nikat.nikat_backend.repositories.ServiceRepository;
import com.nikat.nikat_backend.repositories.ShopRepository;
import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service; // Name conflict with entity
import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final ShopRepository shopRepository;
    private final ServiceRepository serviceRepository;

    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    public List<Listing> getActiveListings() {
        return listingRepository.findByStatus(ListingStatus.ACTIVE);
    }

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Shop createShop(Shop shop) {
        return shopRepository.save(shop);
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }
}
