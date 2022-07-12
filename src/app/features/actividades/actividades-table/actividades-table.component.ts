import { ActividadService } from 'src/app/core/services/actividades/actividad.service';

import { Actividad } from 'src/app/core/interfaces/actividad.interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actividades-table',
  templateUrl: './actividades-table.component.html',
  styleUrls: ['./actividades-table.component.css']
})
export class ActividadesTableComponent implements OnInit {

  buscador : string = '';
  actividades: Actividad[] = [];

  formBuscador: FormGroup = this.fb.group({
    buscador: ['']
  });

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadService
  ) { }

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades(): void {
    this.actividadService.getActividades()
      .subscribe((actividades: Actividad[]) => { 
        console.log(actividades);
        this.actividades = actividades
      }
    );
  }

}
