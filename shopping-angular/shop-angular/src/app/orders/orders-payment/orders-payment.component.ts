import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { Order } from '../model/order';
import { OrdersService } from '../service/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentConditionService } from '../../payment/service/payment-condition.service';
import { PaymentCondition } from '../../payment/model/paymentCondition';
import { FormsModule } from '@angular/forms';
import { OrderPayment } from '../model/orderPayment';
import { OrderItems } from '../model/orderItems';

@Component({
  selector: 'app-orders-payment',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, FormsModule],
  templateUrl: './orders-payment.component.html',
  styleUrl: './orders-payment.component.scss'
})
export class OrdersPaymentComponent {

  order: Observable<Order>;
  orderPayment: Observable<OrderPayment> = of({
    id: null,
    payment: null,
    prize: 0
  })
  orderId: any;
  totalPrize: any;
  orderItems!: any[]
  paymentConditions: Observable<PaymentCondition[]> = of([]);
  paymentConditionsList: PaymentCondition[] = [];
  selectedCondition: number = 0;
  orderItemsList: OrderItems[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrdersService,
    private paymentConditionService: PaymentConditionService) {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    this.order = this.orderService.getOrderById(this.orderId).pipe(
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
    );
    this.order.subscribe(data => {
      this.orderItems = data.orderItems
      this.totalPrize = this.getTotalPrize();
    });
    this.paymentConditions = paymentConditionService.list()
    this.paymentConditions.subscribe(paymentConditionsList => {
      this.paymentConditionsList = paymentConditionsList;
    })
  }

  getTotalPrize() {
    let total: number = 0;
    if (this.orderItems && this.orderItems.length > 0) {
      for (const orderItem of this.orderItems) {
        total += (orderItem.prize * orderItem.quantity);
      }
      return total
    } else {
      return 0;
    }
  }

  onSave() {
    this.paymentConditionService.getConditionById(this.selectedCondition).subscribe(
      paymentCondition => {
        this.orderPayment.subscribe(data => {
          const orderPayment = {
            id: null,
            payment: paymentCondition,
            prize: this.totalPrize
          }; console.log(orderPayment)
          this.order.subscribe(data => {
            console.log(data.orderItems)
            this.orderItemsList = data.orderItems;
            const order = {
              id: data.id,
              client: data.client,
              status: 'F',
              createdAt: data.createdAt,
              updatedAt: new Date,
              orderItems: this.orderItemsList,
              orderPayment: orderPayment
            }
            console.log(order)
            this.orderService.saveOrderWithPayment(order).subscribe({
              error: () => {
                alert("Ocorreu um erro ao finalizar o pedido!")
                this.router.navigate(['orders']);
              },
              complete: () => {
                alert("Pedido finalizado!")
                this.router.navigate(['orders']);
              }
            })
          });
        })
      })
  }
}


