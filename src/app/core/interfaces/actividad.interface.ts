import { Empleado } from "./empleado.interface";

export interface Actividad {
    id?: number;
    nombre: string;
    descripcion: string;
    estado: string;
    fechaEjecucion: string;
    idEmpleado: number;
    empleado?: Empleado;
}