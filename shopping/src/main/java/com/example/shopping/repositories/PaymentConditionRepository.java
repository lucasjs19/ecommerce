package com.example.shopping.repositories;

import com.example.shopping.model.entities.PaymentCondition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentConditionRepository extends JpaRepository<PaymentCondition, Long> {
}
