package com.example.shopping.controllers;

import com.example.shopping.model.entities.Client;
import com.example.shopping.model.entities.Order;
import com.example.shopping.model.entities.Product;
import com.example.shopping.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/pending_orders")
    public List<Order> getAllPendingOrders (){
        return orderService.getAllOrdersPending();
    }

    @GetMapping("/finished_orders")
    public List<Order> getAllFinishedOrders (){
        return orderService.getAllOrdersFinished();
    }

    @GetMapping("/canceled_orders")
    public List<Order> getAllCanceledOrders (){
        return orderService.getAllOrdersCanceled();
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders () {return orderService.getAllOrders();}

    @PutMapping("/order/cancel/{id}")
    public Order cancelOrder (@PathVariable("id") Long id) {return orderService.cancelOrder(id);}

    @GetMapping("/order/{id}")
    public Order getOrderById(@PathVariable("id") Long id){
        return orderService.getOrderById(id);
    }

    @PostMapping("/order")
    public Order saveOrder(@RequestBody Order order){
        return orderService.saveOrder(order);
    }

    @PostMapping("/order/payment")
    public Order saveOrderWithPayment(@RequestBody Order order){
        return orderService.saveOrderWithPayment(order);
    }


}
