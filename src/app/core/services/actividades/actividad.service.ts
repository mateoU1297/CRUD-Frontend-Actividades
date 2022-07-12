import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../../interfaces/actividad.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private myAppUrl: string = 'http://localhost:8080/actividad';

  constructor(
    private http: HttpClient
  ) { }

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.myAppUrl}/listar`);
  }

  create(actividad: Actividad): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}/create`, actividad);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.myAppUrl}/delete/${id}`);
  }

  getActividadesByName(nombre: string): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.myAppUrl}/find-by-name/${nombre}`);
  }

  getActividadById(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.myAppUrl}/find-by-id/${id}`);
  }

}
