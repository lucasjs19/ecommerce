import { Component } from '@angular/core';
import { Product } from '../model/product';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: Observable<Product[]> = of([]);
  displayedColumns = ['id', 'name', 'prize','manufacturerName', 'createdAt', 'updatedAt', 'actions'];
  searchControl = new FormControl();

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.products = this.productService.list();
  }

  onSearch() {
    console.log("entrei")
    this.products = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        return this.productService.list().pipe(
          map((products: Product[]) => {
            return products.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
        );
      })
    );
  }

  onEdit(id: number) {
    this.router.navigate(['edit/' + id], { relativeTo: this.route });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}
