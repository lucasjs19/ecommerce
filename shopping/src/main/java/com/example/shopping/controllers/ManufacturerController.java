package com.example.shopping.controllers;
import com.example.shopping.model.entities.Client;
import com.example.shopping.model.entities.Manufacturer;
import com.example.shopping.services.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ManufacturerController {
    @Autowired
    private ManufacturerService manufacturerService;
    @GetMapping("/manufacturer")
    public List<Manufacturer> getAllManufacturers (){
        return manufacturerService.getAllManufacturers();
    }
    @PostMapping("/manufacturer")
    public Manufacturer saveManufacturer(@RequestBody Manufacturer manufacturer){
        return manufacturerService.saveManufacturer(manufacturer);
    }
    @GetMapping("/manufacturer/{id}")
    public Manufacturer getManufacturerById(@PathVariable("id") Long id){
        return manufacturerService.getManufacturerById(id);
    }

    @PutMapping("/manufacturer/update")
    public Manufacturer updateManufacturerById (@RequestBody Manufacturer manufacturer){
        return manufacturerService.updateManufacturerById(manufacturer);
    }
    @PutMapping("/manufacturer/disable/{id}")
    public Manufacturer disableManufacturer (@PathVariable("id") Long id) {return manufacturerService.disableManufacturer(id);}

    @PutMapping("/manufacturer/activate/{id}")
    public Manufacturer activateManufacturer (@PathVariable("id") Long id) {return manufacturerService.activateManufacturer(id);}

}
