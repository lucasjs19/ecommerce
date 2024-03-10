import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import {MatTableModule} from '@angular/material/table'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule
  ]
})
export class ClientsModule { }
