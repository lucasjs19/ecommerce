import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Product } from '../../products/model/product';
import { Observable, map, of, takeLast } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../../products/service/product.service';
import { FormsModule } from '@angular/forms';
import { Client } from '../../clients/model/client';
import { ClientsService } from '../../clients/services/clients.service';
import { OrderItems } from '../model/orderItems';
import { Order } from '../model/order';
import { table } from 'console';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdersService } from '../service/orders.service';

@Component({
  selector: 'app-orders-new',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule],
  templateUrl: './orders-new.component.html',
  styleUrl: './orders-new.component.scss'
})
export class OrdersNewComponent {

  products: Observable<Product[]> = of([]);
  productsList: Product[] = [];
  selectedProduct: number = 0;

  clients: Observable<Client[]> = of([]);
  clientsList: Client[] = [];
  selectedClient: number = 0;

  orderItemsList: OrderItems[] = [];
  orderProduct: Observable<Product> = of();
  quantity: number = 1;
  orderItemsDataSource = new MatTableDataSource<OrderItems>(this.orderItemsList);

  @ViewChild(MatTable) table!: MatTable<OrderItems>;
  selectedRowIndex: number = -1;

  displayedColumns = ['id', 'name', 'manufacturer', 'quantity', 'unityPrize', 'totalPrize', 'delete'];


  constructor(
    private router: Router,
    private productService: ProductService,
    private clientService: ClientsService,
    private orderService: OrdersService
  ) {
    this.products = this.productService.list();
    this.products.subscribe(productsList => {
      this.productsList = productsList;
    })

    this.clients = clientService.list()
    this.clients.subscribe(clientsList => {
      this.clientsList = clientsList;
    })
  }

  getTotalPrize() {
    let total = 0;
    for (const orderItem of this.orderItemsList) {
      total += (orderItem.prize * orderItem.quantity);
    }
    return total;
  }

  addProduct(id: number, quantity: number) {
    this.orderProduct = this.productService.getProductById(id).pipe(
      map((data: any) => {
        return {
          id: data.id || null,
          name: data.name || '',
          prize: data.prize,
          manufacturer: data.manufacturer,
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        } as Product;
      })
    );
    this.orderProduct.subscribe(product => {
      const newProduct = {
        id: product.id,
        name: product.name,
        prize: product.prize,
        manufacturer: product.manufacturer,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
      const newOrderItem = {
        id: null,
        product: newProduct,
        prize: newProduct.prize,
        quantity: quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.orderItemsList.push(newOrderItem)
      this.orderItemsDataSource.data = this.orderItemsList;
      this.table.renderRows;
    }
    )
  }

  removeProduct(row: OrderItems) {
    const confirmation = window.confirm('Deseja realmente remover este item?');
    if (confirmation) {
      this.selectedRowIndex = row.id!;
      const index = this.orderItemsList.findIndex(item => item.id === this.selectedRowIndex);
      this.orderItemsList.splice(index, 1);
      this.orderItemsDataSource = new MatTableDataSource<OrderItems>(this.orderItemsList);
    }
  }

  private validateOrder(): boolean {
    if (this.selectedClient === 0) {
      alert("Informe o cliente para salvar o pedido!")
      return false;
    }
    if (this.orderItemsDataSource.data.length === 0) {
      alert("Informe os produtos do pedido!")
      return false;
    }
    return true;
  }

  saveOrder() {
    if (this.validateOrder()) {
      this.clientService.getClientById(this.selectedClient).subscribe(
        client => {
          const order = {
            id: null,
            client: client,
            status: 'P',
            createdAt: new Date,
            updatedAt: new Date,
            orderItems: this.orderItemsList,
            orderPayment: null
          };
          this.orderService.saveOrder(order).subscribe({
            error: () => {
              alert("Ocorreu um erro ao salvar o pedido!")
              this.router.navigate(['orders']);
            },
            complete: () => {
              alert("Pedido salvo!")
              this.router.navigate(['orders']);
            }
          })

        }
      )
    }
  }
}

