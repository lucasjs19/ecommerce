package com.example.shopping.repositories;

import com.example.shopping.model.entities.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
}
