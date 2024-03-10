import { Component } from '@angular/core';
import { Manufacturer } from '../model/manufacturer';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerService } from '../service/manufacturer.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manufacturers',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss'
})
export class ManufacturersComponent {
  manufacturers: Observable<Manufacturer[]> = of([]);
  displayedColumns = ['id', 'name', 'createdAt', 'updatedAt', 'active', 'actions'];
  searchControl = new FormControl();

  constructor(
    private manufacturerService: ManufacturerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.manufacturers = this.manufacturerService.list();
  }
  
  onSearch(){
    console.log("entrei")
    this.manufacturers = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        return this.manufacturerService.list().pipe(
          map((manufacturers: Manufacturer[]) => {
            return manufacturers.filter(manufacturer =>
              manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
        );
      })
    );
  }

  onEdit(id: number) {
    this.router.navigate(['edit/' + id], { relativeTo: this.route });
  }
  
  onDeactivate(id: number) {
    this.manufacturerService.disableManufacturer(id).subscribe({
      error: () => {
        alert("Ocorreu um erro ao desativar o fabricante!")
        this.manufacturers = this.manufacturerService.list();
      },
      complete: () => {
        alert("Fabricante desativado!");
        this.manufacturers = this.manufacturerService.list();
      }
    }
    );
  }

  onActivate(id: number) {
    this.manufacturerService.activateManufacturer(id).subscribe({
      error: () => {
        alert("Ocorreu um erro ao desativar o cliente!")
        this.manufacturers = this.manufacturerService.list();
      },
      complete: () => {
        alert("Fabricante ativado!");
        this.manufacturers = this.manufacturerService.list();
      }
    }
    );
  }
  
  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}


