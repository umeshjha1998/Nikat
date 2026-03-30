package com.nikat.api.service;

import com.nikat.api.domain.ServiceOffering;
import com.nikat.api.dto.ServiceOfferingDto;
import com.nikat.api.repository.ServiceOfferingRepository;
import com.nikat.api.repository.ServiceRepository;
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
public class ServiceOfferingService {
    private final ServiceOfferingRepository offeringRepository;
    private final ServiceRepository serviceRepository;
    private final ShopRepository shopRepository;

    public List<ServiceOfferingDto> getOfferingsByService(String serviceId) {
        return offeringRepository.findByServiceId(serviceId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ServiceOfferingDto> getOfferingsByShop(String shopId) {
        return offeringRepository.findByShopId(shopId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ServiceOfferingDto createOffering(ServiceOfferingDto dto) {
        com.nikat.api.domain.Service service = null;
        com.nikat.api.domain.Shop shop = null;

        if (dto.getServiceId() != null) {
            service = serviceRepository.findById(dto.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service profile not found"));
        } else if (dto.getShopId() != null) {
            shop = shopRepository.findById(dto.getShopId())
                    .orElseThrow(() -> new RuntimeException("Shop profile not found"));
        } else {
            throw new RuntimeException("Must provide either serviceId or shopId");
        }

        ServiceOffering offering = ServiceOffering.builder()
                .service(service)
                .shop(shop)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .durationMinutes(dto.getDurationMinutes())
                .status("ACTIVE")
                .build();

        return mapToDto(offeringRepository.save(offering));
    }

    public ServiceOfferingDto updateOffering(UUID id, ServiceOfferingDto dto) {
        ServiceOffering offering = offeringRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offering not found"));
        
        offering.setName(dto.getName());
        offering.setDescription(dto.getDescription());
        offering.setPrice(dto.getPrice());
        offering.setDurationMinutes(dto.getDurationMinutes());
        if (dto.getStatus() != null) offering.setStatus(dto.getStatus());

        return mapToDto(offeringRepository.save(offering));
    }

    public void deleteOffering(UUID id) {
        offeringRepository.deleteById(id);
    }

    private ServiceOfferingDto mapToDto(ServiceOffering offering) {
        return ServiceOfferingDto.builder()
                .id(offering.getId())
                .serviceId(offering.getService() != null ? offering.getService().getId() : null)
                .shopId(offering.getShop() != null ? offering.getShop().getId() : null)
                .name(offering.getName())
                .description(offering.getDescription())
                .price(offering.getPrice())
                .durationMinutes(offering.getDurationMinutes())
                .status(offering.getStatus())
                .build();
    }
}
