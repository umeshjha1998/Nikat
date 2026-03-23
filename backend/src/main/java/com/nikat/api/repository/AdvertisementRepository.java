package com.nikat.api.repository;

import com.nikat.api.domain.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, UUID> {
    List<Advertisement> findByStatusOrderByDisplayOrderAsc(String status);
}
