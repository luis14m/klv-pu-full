import { Elemento } from "./elemento";

export class Actividad {

    idActividad: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    unidad: string;
    precioUnitario: number;
    precioTotal: number;
    elementos: Elemento[];

}
 