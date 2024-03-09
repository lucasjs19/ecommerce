package com.example.shopping.services;

import com.example.shopping.model.entities.Client;
import com.example.shopping.model.entities.Manufacturer;
import com.example.shopping.repositories.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;
    @Override
    public Manufacturer saveManufacturer(Manufacturer manufacturer) {
        return manufacturerRepository.save(manufacturer);
    }

    @Override
    public List<Manufacturer> getAllManufacturers() {
        //List<Manufacturer> allManufacturers = ;
        return manufacturerRepository.findAll();
    }

    @Override
    public Manufacturer getManufacturerById(Long id) {
        Optional<Manufacturer> manufacturer = manufacturerRepository.findById(id);
        if (manufacturer.isPresent()) {
            return manufacturer.get();
        }
        return null;
    }

    @Override
    public Manufacturer disableManufacturer(Long id) {
        Optional<Manufacturer> optionalManufacturer = manufacturerRepository.findById(id);
        if (optionalManufacturer.isPresent()) {
            Manufacturer manufacturer = optionalManufacturer.get();
            manufacturer.setActive(false);
            return manufacturerRepository.save(manufacturer);
        } else {
            throw new RuntimeException("Fabricante não encontrado com o ID: " + id);
        }
    }

    @Override
    public Manufacturer activateManufacturer(Long id) {
        Optional<Manufacturer> optionalManufacturer = manufacturerRepository.findById(id);
        if (optionalManufacturer.isPresent()) {
            Manufacturer manufacturer = optionalManufacturer.get();
            manufacturer.setActive(true);
            return manufacturerRepository.save(manufacturer);
        } else {
            throw new RuntimeException("Fabricante não encontrado com o ID: " + id);
        }
    }

    @Override
    public Manufacturer updateManufacturerById(Manufacturer manufacturer) {
        return manufacturerRepository.save(manufacturer);
    }
}
