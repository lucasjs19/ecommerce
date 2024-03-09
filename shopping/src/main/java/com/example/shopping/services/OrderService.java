package com.example.shopping.services;

import com.example.shopping.model.entities.Order;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrdersPending();
    List<Order> getAllOrdersCanceled();
    List<Order> getAllOrdersFinished();
    List<Order> getAllOrders();
    Order cancelOrder(Long id);
    Order getOrderById (Long id);
    Order saveOrder (Order order);
    Order saveOrderWithPayment(Order order);
}
