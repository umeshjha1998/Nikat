package com.nikat.nikat_backend.repositories;

import com.nikat.nikat_backend.entities.Service;
import com.nikat.nikat_backend.entities.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long>, JpaSpecificationExecutor<Service> {
    List<Service> findByStatus(ListingStatus status);
}
