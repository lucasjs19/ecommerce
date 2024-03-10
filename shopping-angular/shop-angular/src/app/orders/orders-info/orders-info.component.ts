import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../service/orders.service';
import { Order } from '../model/order';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-info',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './orders-info.component.html',
  styleUrl: './orders-info.component.scss'
})
export class OrdersInfoComponent {
  displayedColumns = ['id', 'name', 'manufacturer', 'quantity','unityPrize', 'totalPrize'];
  order: Observable<Order>;
  orderId: any;
  tableOrderItems!: any[]
  totalPrize: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrdersService) {
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
      this.tableOrderItems = data.orderItems
      this.totalPrize = this.getTotalPrize();
    });  
   
  }

  getTotalPrize(){
    let total: number = 0;
    for (const orderItem of this.tableOrderItems){
      total += (orderItem.prize * orderItem.quantity);
    }
    return total;
  }

  print(){
    window.print();
  }
}
