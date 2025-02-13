import { Elemento } from "./elemento.model";

export class Actividad {

    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
   
    unidad: string;
    
    precio_unitario: number=0;
    //precioTotal?: number;
    //fechaUpdate: Date;
    //elementos: Elemento[];

    constructor(){
        this.precio_unitario=0;
    }

}
export interface ActividadCreate {

    
    codigo: string;
    nombre: string;
    descripcion: string;
   
    unidad: string;
    
    precio_unitario: number;
}