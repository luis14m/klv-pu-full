import { Elemento } from "./elemento.model";

export class Actividad {

    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
   
    unidad: string;
    cantidad: number;
    precio_unitario: number;
    precioTotal: number;
    //fechaUpdate: Date;
    elementos: Elemento[];

    constructor(){}


}
 