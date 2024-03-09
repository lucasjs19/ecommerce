package com.example.shopping.services;

import com.example.shopping.model.entities.Manufacturer;
import com.example.shopping.model.entities.PaymentCondition;
import com.example.shopping.repositories.PaymentConditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentConditionServiceImpl implements PaymentConditionService{

    @Autowired
    PaymentConditionRepository paymentConditionRepository;

    @Override
    public List<PaymentCondition> getAllPaymentConditions() {
        return paymentConditionRepository.findAll();
    }

    @Override
    public PaymentCondition getPaymentConditionById(Long id) {
        Optional<PaymentCondition> paymentCondition = paymentConditionRepository.findById(id);
        if (paymentCondition.isPresent()) {
            return paymentCondition.get();
        }
        return null;
    }
}
