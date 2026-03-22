package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.entities.*;
import com.nikat.nikat_backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final ServiceRepository serviceRepository;
    private final ProductRepository productRepository;

    public Map<String, Object> globalSearch(String query) {
        Map<String, Object> results = new HashMap<>();

        List<User> users = userRepository.findAll().stream()
                .filter(u -> (u.getFirstName() != null && u.getFirstName().toLowerCase().contains(query.toLowerCase())) ||
                             (u.getLastName() != null && u.getLastName().toLowerCase().contains(query.toLowerCase())) ||
                             (u.getEmail() != null && u.getEmail().toLowerCase().contains(query.toLowerCase())))
                .toList();

        List<Shop> shops = shopRepository.findAll().stream()
                .filter(s -> s.getStatus() == ListingStatus.ACTIVE &&
                        ((s.getName() != null && s.getName().toLowerCase().contains(query.toLowerCase())) ||
                         (s.getCategory() != null && s.getCategory().toLowerCase().contains(query.toLowerCase()))))
                .toList();

        List<com.nikat.nikat_backend.entities.Service> services = serviceRepository.findAll().stream()
                .filter(s -> s.getStatus() == ListingStatus.ACTIVE &&
                        ((s.getName() != null && s.getName().toLowerCase().contains(query.toLowerCase())) ||
                         (s.getCategory() != null && s.getCategory().toLowerCase().contains(query.toLowerCase())) ||
                         (s.getServiceType() != null && s.getServiceType().toLowerCase().contains(query.toLowerCase()))))
                .toList();

        List<Product> products = productRepository.findAll().stream()
                .filter(p -> p.isAvailable() &&
                        ((p.getName() != null && p.getName().toLowerCase().contains(query.toLowerCase())) ||
                         (p.getDescription() != null && p.getDescription().toLowerCase().contains(query.toLowerCase()))))
                .toList();

        results.put("users", users);
        results.put("shops", shops);
        results.put("services", services);
        results.put("products", products);

        return results;
    }
}
