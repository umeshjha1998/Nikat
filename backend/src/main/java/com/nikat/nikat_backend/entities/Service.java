package com.nikat.nikat_backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Service extends Listing {

    private String serviceType;

    private boolean isTechnician;

    private String workStartTime;
    private String workEndTime;

    @ElementCollection
    @CollectionTable(name = "service_charges", joinColumns = @JoinColumn(name = "service_id"))
    @MapKeyColumn(name = "service_name")
    @Column(name = "charge")
    private Map<String, Double> serviceCharges;
}
