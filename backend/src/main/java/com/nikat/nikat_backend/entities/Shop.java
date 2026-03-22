package com.nikat.nikat_backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "shops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Shop extends Listing {

    private String shopType;

    private Integer numberOfWorkers;

    @ElementCollection
    private List<String> productsOrServicesSold;

    private String openingHours;
}
