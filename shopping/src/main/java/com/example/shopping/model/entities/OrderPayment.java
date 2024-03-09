package com.example.shopping.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "ORDERS_PAYMENT")
public class OrderPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name="order_id", referencedColumnName = "id")
    private Order order;
    @ManyToOne
    @JoinColumn(name = "payment_id", referencedColumnName = "id")
    private PaymentCondition payment;
    private Double prize;

    public OrderPayment() {
    }

    public OrderPayment(Long id, Order order, PaymentCondition payment, Double prize) {
        this.id = id;
        this.order = order;
        this.payment = payment;
        this.prize = prize;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public PaymentCondition getPayment() {
        return payment;
    }

    public void setPayment(PaymentCondition payment) {
        this.payment = payment;
    }

    public Double getPrize() {
        return prize;
    }

    public void setPrize(Double prize) {
        this.prize = prize;
    }

}
