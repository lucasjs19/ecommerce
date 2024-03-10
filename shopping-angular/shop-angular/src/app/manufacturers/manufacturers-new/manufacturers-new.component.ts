import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Router } from '@angular/router';
import { ManufacturerService } from '../service/manufacturer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manufacturers-new',
  standalone: true,
  imports: [AppMaterialModule, FormsModule],
  templateUrl: './manufacturers-new.component.html',
  styleUrl: './manufacturers-new.component.scss'
})
export class ManufacturersNewComponent {

  constructor(
    private router: Router,
    private manufacturerService: ManufacturerService) { }

  inputName: string = '';

  onCancel() {
    this.router.navigate(['manufacturers']);
  }

  onSave() {
    const manufacturer = { id: null, name: this.inputName, createdAt: new Date, updatedAt: new Date, active: true };
    this.manufacturerService.saveManufacturer(manufacturer).subscribe({
      error: () => {
        alert("Ocorreu um erro ao cadastrar o fabricante!")
        this.router.navigate(['manufacturers']);
      },
      complete: () => {
        alert("Fabricante cadastrado!")
        this.router.navigate(['manufacturers']);
      }
    }
    )
  }
}
