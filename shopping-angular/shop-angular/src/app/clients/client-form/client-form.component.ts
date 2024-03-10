import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [AppMaterialModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})

export class ClientFormComponent {

  constructor(
    private router: Router,
    private clientsService: ClientsService
  ) { }

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
  
  inputName: string = '';
  inputEmail: string = '';
  
  onSave() {
    const client = { id: null, name:this.inputName , email: this.inputEmail, createdAt: new Date, updatedAt: new Date, active: true };
    this.clientsService.saveClient(client).subscribe(
      response => {
        console.log("Salvo", response)
        alert("Cliente cadastrado!")
        this.router.navigate(['clients']);
      },
      error => {
        console.error("Nao salvo", error)
        alert("Ocorreu um erro ao cadastrar o cliente!")
        this.router.navigate(['clients']);
      }
    )
  }

}

