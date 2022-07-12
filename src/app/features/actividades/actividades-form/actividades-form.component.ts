import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/core/services/empleados/empleados.service';

import { Empleado } from '../../../core/interfaces/empleado.interface';

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
    private empleadoService: EmpleadosService
    ) {
      this.formActividad = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        estado: ['', Validators.required],
        fecha: ['', Validators.required],
        id_empleado: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.getEmpleados();
  }

  guardar(): void {

  }

  cancelar(): void {

  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados()
      .subscribe((empleados: Empleado[]) => {
        this.empleados = empleados;
      }
    );
  }
}
