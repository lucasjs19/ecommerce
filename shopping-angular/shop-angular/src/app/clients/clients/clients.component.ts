import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ClientsService } from '../services/clients.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent{
  clients: Observable<Client[]> = of([]);
  searchControl = new FormControl();
  displayedColumns = ['id', 'name', 'email', 'createdAt', 'updatedAt', 'active', 'actions'];

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.clients = this.clientsService.list();
  }  

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onDeactivate(id: number) {
    this.clientsService.disableClient(id).subscribe({
      error: () => {
        alert("Ocorreu um erro ao desativar o cliente!")
        this.clients = this.clientsService.list();
      },
      complete: () => {
        alert("Cliente desativado!");
        this.clients = this.clientsService.list();
      }
    }
    );
  }

  onActivate(id: number) {
    this.clientsService.activateClient(id).subscribe({
      error: () => {
        alert("Ocorreu um erro ao ativar o cliente!")
        this.clients = this.clientsService.list();
      },
      complete: () => {
        alert("Cliente ativado!");
        this.clients = this.clientsService.list();
      }
    }
    );
  }

  onEdit(id: number) {
    this.router.navigate(['edit/' + id], { relativeTo: this.route });
  }

  onSearch(){
    console.log("entrei")
    this.clients = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        return this.clientsService.list().pipe(
          map((clients: Client[]) => {
            // Filtrar os clientes com base no termo de pesquisa
            return clients.filter(client =>
              client.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
        );
      })
    );
  }
}
