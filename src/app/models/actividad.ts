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
    fechaUpdate: Date;
    elementos: Elemento[];

    constructor(){}


}
 