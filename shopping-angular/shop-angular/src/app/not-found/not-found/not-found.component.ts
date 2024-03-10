import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
