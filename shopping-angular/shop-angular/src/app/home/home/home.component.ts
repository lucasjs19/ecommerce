import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  //cols: number;
  //rows: number;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor( private router: Router){}
  tiles: Tile[] = [
    {text: 'clientes', color: '#256EDC', icon: 'contacts'},
    {text: 'fabricantes', color: '#427ED7', icon: 'factory'},
    {text: 'produtos', color: '#578FE3', icon: 'inventory'},
    {text: 'pedidos', color: '#5F95E7', icon:'shopping_cart_checkout'},
    {text: 'usarios', color: '#97BDF5', icon: 'person' }
  ];

  onClick(text: string){
    if (text === 'clientes'){
      this.router.navigate(['clients']);
    }
    if (text === 'fabricantes'){
      this.router.navigate(['manufacturers']);
    }
    if (text === 'produtos'){
      this.router.navigate(['products']);
    }
    if (text === 'pedidos'){
      this.router.navigate(['orders']);
    }
  }
}
