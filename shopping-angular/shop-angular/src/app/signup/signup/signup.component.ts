import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AppMaterialModule,
            MatFormFieldModule,
            MatInputModule,
            FormsModule,
            ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor( private router: Router ){}

  email = new FormControl('', [Validators.required, Validators.email]);
  inputEmail: string = '';
  inputPassword: string = '';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Digite o e-mail';
    }

    return this.email.hasError('email') ? 'E-mail inválido' : '';
  }

  onCancel() {
    this.router.navigate(['']);
  }
  onSave(){}

}
