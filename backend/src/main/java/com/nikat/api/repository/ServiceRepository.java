package com.nikat.api.repository;

import com.nikat.api.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<Service, String> {
    long countByCreatedAtAfter(LocalDateTime date);
    List<Service> findByProviderId(String providerId);
    List<Service> findByStatus(String status);
}
