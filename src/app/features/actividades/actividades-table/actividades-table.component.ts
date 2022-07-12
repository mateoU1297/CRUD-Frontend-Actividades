import { ActividadService } from 'src/app/core/services/actividades/actividad.service';

import { Actividad } from 'src/app/core/interfaces/actividad.interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

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
        this.actividades = actividades
      }
    );
  }

  limpiarBuscador(): void {
    this.buscador = '';
    this.actividadService.getActividades().subscribe(
      actividades => {
        this.actividades = actividades;
        this.formBuscador.reset();
      }
    );
  }

  buscarPorNombre(): void {
    if(this.formBuscador.get('buscador')?.value != ''){
      this.actividadService.getActividadesByName(this.formBuscador.get('buscador')?.value.toLowerCase())
        .subscribe( actividades => {
          this.actividades = actividades;
          this.formBuscador.reset();
        }
      );
    }
  }

  eliminar(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Esta seguro que desea eliminar la actividad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.delete(id).subscribe(
          data => {
            this.getActividades();
            Swal.fire(
              'Eliminado!',
              'Actividad eliminada con éxito.',
              'success'
            )
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se eliminó la actividad',
          'error'
        )
      }
    })
  }

}
