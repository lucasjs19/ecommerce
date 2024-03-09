package com.example.shopping.model.entities;

import jakarta.persistence.*;

@Entity
@Table (name="PAYMENT_CONDITIONS")
public class PaymentCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    public PaymentCondition() {
    }

    public PaymentCondition(Long id, String description) {
        this.id = id;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
