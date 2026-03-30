package com.nikat.api.service;

import com.nikat.api.domain.ServiceOffering;
import com.nikat.api.dto.ServiceOfferingDto;
import com.nikat.api.repository.ServiceOfferingRepository;
import com.nikat.api.repository.ServiceRepository;
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

    public List<ServiceOfferingDto> getOfferingsByService(String serviceId) {
        return offeringRepository.findByServiceId(serviceId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ServiceOfferingDto createOffering(ServiceOfferingDto dto) {
        com.nikat.api.domain.Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service profile not found"));

        ServiceOffering offering = ServiceOffering.builder()
                .service(service)
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
                .serviceId(offering.getService().getId())
                .name(offering.getName())
                .description(offering.getDescription())
                .price(offering.getPrice())
                .durationMinutes(offering.getDurationMinutes())
                .status(offering.getStatus())
                .build();
    }
}
