package com.example.shopping.services;

import com.example.shopping.model.entities.*;
import com.example.shopping.repositories.OrderRepository;
import jakarta.transaction.Status;
import org.hibernate.annotations.DialectOverride;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Override
    public List<Order> getAllOrdersPending() {
        return orderRepository.findByStatus("P");
    }

    @Override
    public List<Order> getAllOrdersCanceled() {
        return orderRepository.findByStatus("C");
    }

    @Override
    public List<Order> getAllOrdersFinished(){
        return orderRepository.findByStatus("F");}

    @Override
    public List<Order> getAllOrders() { return orderRepository.findAll();}

    @Override
    public Order cancelOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus("C");
            return orderRepository.save(order);
        } else {
            throw new RuntimeException("Cliente não encontrado com o ID: " + id);
        }
    }

    @Override
    public Order getOrderById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            return order.get();
        }
        return null;
    }

    @Override
    public Order saveOrderWithPayment(Order order) {
        Order savedOrder = orderRepository.save(order);
        OrderPayment orderPayment = savedOrder.getOrderPayment();
        for (OrderItem orderItem : savedOrder.getOrderItems()) {
            orderItem.setOrder(savedOrder);
        }
        if (orderPayment != null) {
            orderPayment.setOrder(savedOrder);
        }
        return orderRepository.save(savedOrder);
    }

    @Override
    public Order saveOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        for (OrderItem orderItem : savedOrder.getOrderItems()) {
            orderItem.setOrder(savedOrder);
        }
        return orderRepository.save(savedOrder);
    }
}
