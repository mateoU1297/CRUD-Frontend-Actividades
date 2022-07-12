import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../../interfaces/empleado.interface';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private myAppUrl: string = 'http://localhost:8080/empleado';

  constructor(
    private http: HttpClient
  ) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.myAppUrl}/listar`);
  }

}
