import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadesRoutingModule } from './actividades-routing.module';

import { ActividadesFormComponent } from './actividades-form/actividades-form.component';
import { ActividadesTableComponent } from './actividades-table/actividades-table.component';


@NgModule({
  declarations: [
    ActividadesFormComponent,
    ActividadesTableComponent
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule
  ]
})
export class ActividadesModule { }
