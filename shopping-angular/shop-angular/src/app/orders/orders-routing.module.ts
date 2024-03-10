import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrdersInfoComponent } from './orders-info/orders-info.component';
import { OrdersNewComponent } from './orders-new/orders-new.component';
import { OrdersPaymentComponent } from './orders-payment/orders-payment.component';

const routes: Routes = [
  { path: '', component: OrdersComponent},
  {path: 'info/:id', component: OrdersInfoComponent},
  {path: 'new', component: OrdersNewComponent},
  {path: 'payment/:id', component: OrdersPaymentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
