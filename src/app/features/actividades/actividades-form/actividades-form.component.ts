
import { EmpleadoService } from 'src/app/core/services/empleados/empleado.service';
import { ActividadService } from 'src/app/core/services/actividades/actividad.service';

import { Empleado } from '../../../core/interfaces/empleado.interface';
import { Actividad } from 'src/app/core/interfaces/actividad.interface';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades-form',
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.css']
})
export class ActividadesFormComponent implements OnInit {

  formActividad : FormGroup;

  estados: string[] = ['REALIZADA', 'PENDIENTE'];

  empleados: Empleado[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private activatedRoute: ActivatedRouteSnapshot,
    private empleadoService: EmpleadoService,
    private actividadService: ActividadService
    ) {
      this.formActividad = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        estado: ['', Validators.required],
        fechaEjecucion: ['', Validators.required],
        idEmpleado: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    // if (!this.router.url.includes('editar')) {
    //   return;
    // }

    // this.activatedRoute.params
    //   .pipe(
    //     switchMap(({id}) => this.heroesService.getHeroeById(id))
    //   )
    //   .subscribe( heroe => this.heroe = heroe);

    this.getEmpleados();
  }

  guardar(): void {
    console.log("datos", this.formActividad.value);

    // const actividad = {
    //   nombre: this.formActividad.get('nombre')?.value,
    //   descripcion: this.formActividad.get('descripcion')?.value,
    //   fechaEjecucion: this.formActividad.get('fechaEjecucion')?.value,
    //   estado: this.formActividad.get('estado')?.value,
    //   empleado: {
    //     id: 1,
    //     nombre: 'mateo castro'
    //   }
    // }

    this.actividadService.create(this.formActividad.value).subscribe(
      data => {
        Swal.fire({
          title: 'Se ha guardado con éxito',
          text: `usuario guardado con éxito`,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/actividades']);
          }
        });
      }, error => {
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
