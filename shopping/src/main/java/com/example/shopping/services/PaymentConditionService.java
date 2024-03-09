package com.example.shopping.services;

import com.example.shopping.model.entities.Manufacturer;
import com.example.shopping.model.entities.PaymentCondition;

import java.util.List;

public interface PaymentConditionService {

    List<PaymentCondition> getAllPaymentConditions();
    PaymentCondition getPaymentConditionById(Long id);
}
