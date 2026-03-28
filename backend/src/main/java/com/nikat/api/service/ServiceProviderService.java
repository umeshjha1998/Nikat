package com.nikat.api.service;

import com.nikat.api.dto.ServiceDto;
import com.nikat.api.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@org.springframework.transaction.annotation.Transactional
public class ServiceProviderService {

    private final ServiceRepository serviceRepository;

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
                .build();
    }
}
