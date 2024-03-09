package com.example.shopping.services;

import com.example.shopping.model.entities.Manufacturer;
import com.example.shopping.model.entities.Product;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(Long id);
}
