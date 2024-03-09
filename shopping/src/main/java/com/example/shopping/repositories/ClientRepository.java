package com.example.shopping.repositories;

import com.example.shopping.model.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
