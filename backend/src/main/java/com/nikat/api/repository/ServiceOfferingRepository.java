package com.nikat.api.repository;

import com.nikat.api.domain.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, UUID> {
    List<ServiceOffering> findByServiceId(String serviceId);
    List<ServiceOffering> findByShopId(String shopId);
}
