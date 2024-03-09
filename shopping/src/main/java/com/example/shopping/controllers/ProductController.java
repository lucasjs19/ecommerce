package com.example.shopping.controllers;

import com.example.shopping.model.entities.Manufacturer;
import com.example.shopping.model.entities.Product;
import com.example.shopping.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    @PostMapping("/product")
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @GetMapping("/product")
    public List<Product> getAllProducts (){
        return productService.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable("id") Long id){
        return productService.getProductById(id);
    }

}
