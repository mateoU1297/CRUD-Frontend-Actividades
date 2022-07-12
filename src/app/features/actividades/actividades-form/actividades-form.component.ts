
import { EmpleadoService } from 'src/app/core/services/empleados/empleado.service';
import { ActividadService } from 'src/app/core/services/actividades/actividad.service';

import { Empleado } from '../../../core/interfaces/empleado.interface';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades-form',
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.css']
})
export class ActividadesFormComponent implements OnInit {

  formActividad : FormGroup;

  estados: string[] = ['PENDIENTE', 'REALIZADA'];
  msj: string = '';

  empleados: Empleado[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private actividadService: ActividadService
    ) {
      this.formActividad = this.fb.group({
        id: [''],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        estado: [this.estados[0], Validators.required],
        fechaEjecucion: ['', Validators.required],
        idEmpleado: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.msj = 'Editar';
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.actividadService.getActividadById(id))
        )
        .subscribe( actividad => this.formActividad.reset(actividad));
    } else {
      this.msj = 'Crear';
    }
    this.getEmpleados();
  }

  guardar(): void {

    this.actividadService.create(this.formActividad.value).subscribe(
      () => {
        Swal.fire({
          title: 'Se ha guardado con éxito',
          text: `usuario guardado con éxito`,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/actividades']);
          }
        });
      }, () => {
        Swal.fire({
          title: 'Error!',
          text: 'El nombre del usuario que intenta crear ya esta en la base de datos',
          icon: 'error',
        });
      }
    )
  }

  cancelar(): void {
    this.router.navigate(['actividades']);
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados()
      .subscribe((empleados: Empleado[]) => {
        this.empleados = empleados;
      }
    );
  }
}
