package com.example.shopping.controllers;

import com.example.shopping.model.entities.PaymentCondition;
import com.example.shopping.model.entities.Product;
import com.example.shopping.services.PaymentConditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PaymentConditionController {
    @Autowired
    PaymentConditionService paymentConditionService;

    @GetMapping("/payment_condition")
    public List<PaymentCondition> getAllPaymentConditions (){
        return paymentConditionService.getAllPaymentConditions();
    }

    @GetMapping("/payment_condition/{id}")
    public PaymentCondition getPaymentConditionById(@PathVariable("id") Long id){
        return paymentConditionService.getPaymentConditionById(id);
    }


}
