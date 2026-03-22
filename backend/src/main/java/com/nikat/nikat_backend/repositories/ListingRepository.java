package com.nikat.nikat_backend.repositories;

import com.nikat.nikat_backend.entities.Listing;
import com.nikat.nikat_backend.entities.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long>, JpaSpecificationExecutor<Listing> {
    List<Listing> findByStatus(ListingStatus status);
}
