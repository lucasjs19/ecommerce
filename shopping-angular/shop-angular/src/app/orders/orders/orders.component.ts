import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { OrdersService } from '../service/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Order } from '../model/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  pendingOrders: Observable<Order[]> = of([]);
  finishedOrders: Observable<Order[]> = of([]);
  canceledOrders: Observable<Order[]> = of([]);
  displayedColumns = ['id', 'client', 'createdAt', 'updatedAt', 'actions'];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.pendingOrders = ordersService.listPendingOrders();
    this.finishedOrders = ordersService.listCompletedOrders();
    this.canceledOrders = ordersService.listCanceledOrders();
  }

  onAdd(){
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  onFinish(id: number){
    this.router.navigate(['payment/' + id], { relativeTo: this.route });
  }

  onEdit(id: number){}
  
  onInfo(id: number){
    this.router.navigate(['info/' + id], { relativeTo: this.route });
  }
  //onDeactivate(id: number){}

  onCancel(id: number) {
    console.log("to aqui")
    this.ordersService.cancelOrder(id).subscribe({
      error: () => {
        alert("Ocorreu um erro ao desativar o cliente!")
        this.pendingOrders = this.ordersService.listPendingOrders();
        this.canceledOrders = this.ordersService.listCanceledOrders();
      },
      complete: () => {
        alert("Pedido cancelado!");
        this.pendingOrders = this.ordersService.listPendingOrders();
        this.canceledOrders = this.ordersService.listCanceledOrders()
      }
    }
    );
  }
}
