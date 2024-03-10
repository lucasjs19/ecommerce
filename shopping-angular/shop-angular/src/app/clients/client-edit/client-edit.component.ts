import { ActivatedRoute, Router } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { Client } from '../model/client';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, FormsModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent {
  //client: Client = {id: null, name: '', email: '', createdAt: null, updatedAt: null}
  client: Observable<Client>;
  clientId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private router: Router,) {
    this.clientId = this.activatedRoute.snapshot.paramMap.get('id');
    this.client = this.clientsService.getClientById(this.clientId).pipe(
      map((data: any) => {
        // Transforme os dados conforme necessário
        return {
          id: data.id || null,
          name: data.name || '',
          email: data.email || '',
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
          active: data.active || false
        } as Client;
      })
    );
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Digite o e-mail';
    }

    return this.email.hasError('email') ? 'E-mail inválido' : '';
  }

  onCancel() {
    this.router.navigate(['clients']);
  }

  onSave(name: string, email: string) {
    this.client.subscribe((client: Client) => {
      const updatedClient = {
        id: client.id,
        name: name,
        email: email,
        createdAt: client.createdAt,
        updatedAt: new Date,
        active: client.active,
      }
      this.clientsService.saveClient(updatedClient).subscribe({
        error: () => {
          alert("Ocorreu um erro ao atualizar o cliente!")
          this.router.navigate(['clients']);
        },
        complete: () => {
          alert("Cliente atualizado!");
          this.router.navigate(['clients']);
        }
      }
      )
    })
  }
}
