import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { ManufacturersNewComponent } from './manufacturers-new/manufacturers-new.component';
import { ManufacturersEditComponent } from './manufacturers-edit/manufacturers-edit.component';

const routes: Routes = [
  { path: '', component: ManufacturersComponent},
  { path: 'new', component: ManufacturersNewComponent},
  {path: 'edit/:id', component: ManufacturersEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }
