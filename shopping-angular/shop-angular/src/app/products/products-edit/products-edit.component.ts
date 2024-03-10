import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../model/product';
import { Observable, map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Manufacturer } from '../../manufacturers/model/manufacturer';
import { ManufacturerService } from '../../manufacturers/service/manufacturer.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-products-edit',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, FormsModule],
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.scss'
})
export class ProductsEditComponent {

  product: Observable<Product>;
  productId: any;
  manufacturerId: number = 0;
  manufacturers: Observable<Manufacturer[]> = of([]);
  manufacturersList: Manufacturer[] = [];
  manufacturer: Manufacturer = { id: null, name: '', createdAt: null, updatedAt: null, active: false };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private manufacturerService: ManufacturerService) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(this.productId).pipe(
      map((data: any) => {
        // Transforme os dados conforme necessário
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
    this.manufacturers = this.manufacturerService.list();
    this.manufacturers.subscribe(manufacturersList => {
      this.manufacturersList = manufacturersList;
    })
  }

  onCancel() {
    this.router.navigate(['products']);
  }

  private validateInputs(name: String, prize: number): boolean {
    if (!name || name.trim() === '') {
      alert('O campo "Nome" é obrigatório!');
      return false;
    }

    if (!prize || isNaN(prize)) {
      alert('O campo "Preço" é obrigatório e deve ser um número!');
      return false;
    }

    return true;
  }

  onSave(name: string, manufacturerId: any, prize: number) {

    if (this.validateInputs(name, prize)) {
      this.manufacturerService.getManufacturerById(manufacturerId).
        subscribe(manufacturer => {
          const updatedManufacturer = {
            id: manufacturer.id,
            name: manufacturer.name,
            createdAt: manufacturer.createdAt,
            updatedAt: manufacturer.updatedAt,
            active: manufacturer.active
          };
          this.product.subscribe(product => {
            const updatedProduct = {
              id: product.id,
              name: name,
              manufacturer: updatedManufacturer,
              prize: prize,
              createdAt: product.createdAt,
              updatedAt: new Date()
            };
            this.productService.saveProduct(updatedProduct).subscribe({
              error: () => {
                alert("Ocorreu um erro ao atualizar o produto!")
              this.router.navigate(['products']);
              },
              complete: () => {
                alert("Produto atualizado!")
                this.router.navigate(['products']);
              }
            })
          })
        })
    }
  }
}
