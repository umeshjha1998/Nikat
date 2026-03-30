package com.nikat.api.service;

import com.nikat.api.dto.ServiceDto;
import com.nikat.api.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@org.springframework.transaction.annotation.Transactional
public class ServiceProviderService {

    private final ServiceRepository serviceRepository;
    private final com.nikat.api.repository.ReviewRepository reviewRepository;

    public List<ServiceDto> getAllServices() {
        return serviceRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ServiceDto getServiceById(String id) {
        com.nikat.api.domain.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        return mapToDto(service);
    }

    public List<ServiceDto> getServicesByProvider(String providerId) {
        return serviceRepository.findByProviderId(providerId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<ServiceDto> getServicesByStatus(String status) {
        return serviceRepository.findByStatus(status).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ServiceDto updateServiceStatus(String id, String status) {
        com.nikat.api.domain.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        service.setStatus(status);
        return mapToDto(serviceRepository.save(service));
    }

    public ServiceDto createService(ServiceDto dto) {
        com.nikat.api.domain.Service service = mapToEntity(dto);
        if (serviceRepository.existsByProviderId(dto.getProviderId())) {
            throw new RuntimeException("Profile already exists for this provider.");
        }
        return mapToDto(serviceRepository.save(service));
    }

    public ServiceDto updateService(String id, ServiceDto dto) {
        com.nikat.api.domain.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setBaseCharge(dto.getBaseCharge());
        service.setServiceArea(dto.getServiceArea());
        service.setStartTime(dto.getStartTime());
        service.setEndTime(dto.getEndTime());
        service.setPhoneNumber(dto.getPhoneNumber());
        service.setLatitude(dto.getLatitude());
        service.setLongitude(dto.getLongitude());

        if (dto.getCategoryId() != null) {
            com.nikat.api.domain.Category category = new com.nikat.api.domain.Category();
            category.setId(dto.getCategoryId());
            service.setCategory(category);
        }

        return mapToDto(serviceRepository.save(service));
    }

    private ServiceDto mapToDto(com.nikat.api.domain.Service service) {
        return ServiceDto.builder()
                .id(service.getId())
                .providerId(service.getProvider().getId())
                .providerName(service.getProvider().getFirstName() + " " + (service.getProvider().getLastName() != null ? service.getProvider().getLastName() : ""))
                .name(service.getName())
                .categoryName(service.getCategory() != null ? service.getCategory().getName() : null)
                .categoryId(service.getCategory() != null ? service.getCategory().getId() : null)
                .description(service.getDescription())
                .serviceArea(service.getServiceArea())
                .startTime(service.getStartTime())
                .endTime(service.getEndTime())
                .baseCharge(service.getBaseCharge())
                .status(service.getStatus())
                .isFeatured(service.getIsFeatured())
                .phoneNumber(service.getPhoneNumber())
                .latitude(service.getLatitude())
                .longitude(service.getLongitude())
                .averageRating(reviewRepository.findAverageRatingByServiceId(service.getId()))
                .build();
    }

    private com.nikat.api.domain.Service mapToEntity(ServiceDto dto) {
        com.nikat.api.domain.User provider = new com.nikat.api.domain.User();
        provider.setId(dto.getProviderId());

        com.nikat.api.domain.Service service = com.nikat.api.domain.Service.builder()
                .id("SVC-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .provider(provider)
                .name(dto.getName())
                .description(dto.getDescription())
                .serviceArea(dto.getServiceArea())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .baseCharge(dto.getBaseCharge())
                .status(dto.getStatus())
                .isFeatured(dto.getIsFeatured())
                .phoneNumber(dto.getPhoneNumber())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .build();

        if (dto.getCategoryId() != null) {
            com.nikat.api.domain.Category category = new com.nikat.api.domain.Category();
            category.setId(dto.getCategoryId());
            service.setCategory(category);
        }

        return service;
    }
}
