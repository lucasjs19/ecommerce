import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { Manufacturer } from '../../manufacturers/model/manufacturer';
import { Observable, of } from 'rxjs';
import { ManufacturerService } from '../../manufacturers/service/manufacturer.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-products-new',
  standalone: true,
  imports: [AppMaterialModule, FormsModule],
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.scss'
})
export class ProductsNewComponent {

  manufacturers: Observable<Manufacturer[]> = of([]);
  manufacturersList: Manufacturer[] = [];
  //manufacturer: Manufacturer = { id: null, name: '', createdAt: null, updatedAt: null, active: false };

  constructor(
    private router: Router,
    private productService: ProductService,
    private manufacturerService: ManufacturerService,
  ) {
    this.manufacturers = this.manufacturerService.list();
    this.manufacturers.subscribe(manufacturersList => {
      this.manufacturersList = manufacturersList;
    })
  }

  inputName: string = '';
  selectedManufacturer: number = 0;
  inputPrize: any = '';

  onCancel() {
    this.router.navigate(['products']);
  }

  ValidateSave(name: string, prize: number, selectedManufacturer: number) {
    if (name === '') {
      return false
    }

    if (prize === 0) {
      return false
    }

    if (selectedManufacturer === 0) {
      return false
    }

    return true
  }

  private validateInputs(): boolean {
    if (!this.inputName || this.inputName.trim() === '') {
      alert('O campo "Nome" é obrigatório!');
      return false;
    }

    if (!this.inputPrize || isNaN(this.inputPrize)) {
      alert('O campo "Preço" é obrigatório e deve ser um número!');
      return false;
    }

    if (!this.selectedManufacturer) {
      alert('O campo "Fabricante" é obrigatório!');
      return false;
    }

    return true;
  }

  onSave() {
    if (this.validateInputs()) {
      this.manufacturerService.getManufacturerById(this.selectedManufacturer).
        subscribe(manufacturer => {
          const product = {
            id: null,
            name: this.inputName,
            manufacturer: manufacturer,
            prize: this.inputPrize,
            createdAt: new Date,
            updatedAt: new Date
          };
          this.productService.saveProduct(product).subscribe({
            error: () => {
              alert("Ocorreu um erro ao cadastrar o produto!")
              this.router.navigate(['products']);
            },
            complete: () => {
              alert("Produto cadastrado!")
              this.router.navigate(['products']);
            }
          }
          )
        })
    }
  }
}
