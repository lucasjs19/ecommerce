import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  listPendingOrders() {
    return this.httpClient.get<Order[]>('http://localhost:8080/pending_orders');
  }

  listCompletedOrders() {
    return this.httpClient.get<Order[]>('http://localhost:8080/finished_orders');
  }

  listCanceledOrders() {
    return this.httpClient.get<Order[]>('http://localhost:8080/canceled_orders');
  }

  // disableClient(id: number): Observable<any> {
  cancelOrder(id: number): Observable<any> {
    const url = 'http://localhost:8080/order/cancel/' + id
    return this.httpClient.put(url, null);
  }

  getOrderById(id: number): Observable<Order> {
    return this.httpClient.get('http://localhost:8080/order/' + id).pipe(
      map((data: any) => {
        return {
          id: data.id,
          client: data.client,
          status: data.status,
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
          orderItems: data.orderItems
        } as Order;
      })
    )
  }

  saveOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>('http://localhost:8080/order', order);
  }

  saveOrderWithPayment(order: Order): Observable<Order> {
    return this.httpClient.post<Order>('http://localhost:8080/order/payment', order);
  }
}



