package com.example.shopping.services;

import com.example.shopping.model.entities.Client;
import com.example.shopping.model.entities.Manufacturer;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ManufacturerService {
    Manufacturer saveManufacturer(Manufacturer manufacturer);
    List<Manufacturer> getAllManufacturers();
    Manufacturer getManufacturerById(Long id);
    Manufacturer disableManufacturer(Long id);
    Manufacturer activateManufacturer(Long id);
    Manufacturer updateManufacturerById (Manufacturer manufacturer);
}
