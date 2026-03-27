package com.nikat.api.repository;

import com.nikat.api.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByShopIdOrderByAppointmentTimeAsc(UUID shopId);
    List<Appointment> findByUserId(UUID userId);
}
