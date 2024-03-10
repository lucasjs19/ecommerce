import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manufacturer } from '../model/manufacturer';
import { Observable, map } from 'rxjs';
import { ManufacturerService } from '../service/manufacturer.service';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manufacturers-edit',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule],
  templateUrl: './manufacturers-edit.component.html',
  styleUrl: './manufacturers-edit.component.scss'
})
export class ManufacturersEditComponent {

  manufacturer: Observable<Manufacturer>;
  manufacturerId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manufacturerService: ManufacturerService) {
    this.manufacturerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.manufacturer = this.manufacturerService.getManufacturerById(this.manufacturerId).pipe(
      map((data: any) => {
        // Transforme os dados conforme necessário
        return {
          id: data.id || null,
          name: data.name || '',
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
          active: data.active
        } as Manufacturer;
      })
    );
  }

  onCancel() {
    this.router.navigate(['manufacturers']);
  }

  onSave(name: string) {
    this.manufacturer.subscribe((manufacturer: Manufacturer) => {
      const updatedManufacturer = {
        id: manufacturer.id,
        name: name,
        createdAt: manufacturer.createdAt,
        updatedAt: new Date,
        active: manufacturer.active,
      }
      this.manufacturerService.saveManufacturer(updatedManufacturer).subscribe({
        error: () => {
          alert("Ocorreu um erro ao atualizar o fabricante!")
          this.router.navigate(['manufacturers']);
        },
        complete: () => {
          alert("Fabricante atualizado!");
          this.router.navigate(['manufacturers']);
        }
      }
      )
    })
  }

}

