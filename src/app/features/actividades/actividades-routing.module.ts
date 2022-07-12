import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActividadesFormComponent } from './actividades-form/actividades-form.component';
import { ActividadesTableComponent } from './actividades-table/actividades-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ActividadesTableComponent
      },
      {
        path: 'crear',
        component: ActividadesFormComponent
      },
      {
        path: 'editar/:id',
        component: ActividadesFormComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }
