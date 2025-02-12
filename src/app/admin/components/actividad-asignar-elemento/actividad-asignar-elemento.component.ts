import { Component, Inject } from '@angular/core';
import { Elemento } from '../../../shared/models/elemento.model';


import { Actividad } from '../../../shared/models/actividad.model';
import { ActividadService } from '../../services/actividad.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute,Router } from '@angular/router';

import { ElementoService } from '../../services/elemento.service';

@Component({
  selector: 'app-actividad-asignar-elemento',
  
  standalone: true, // 
  imports: [CommonModule,FormsModule,RouterLink], // Importar módulos necesarios
  templateUrl: './actividad-asignar-elemento.component.html',
})
export class ActividadAsignarElementoComponent {
  
  actividad!: Actividad;
  idActividad!: number;
  elementos: Elemento[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['idElemento', 'codigo', 
    'nombre', 'unidad', 'cantidad', 'precioUnitario', 'acciones'];

  constructor(
    private actividadServicio: ActividadService,
    private elementoServicio: ElementoService, 
    private enrutador: Router,
    private ruta: ActivatedRoute)
    //private dialog: MatDialog,
    /* @Inject(MAT_DIALOG_DATA) public data: { idActividad: number, title: string }){
    this.idActividad = data.idActividad; */
  {}

  ngOnInit() {
    // Cargamos los Elementos
    //this.obtenerElementos();
    //this.obtenerActividad();
  }

  filteredData() {
    return this.elementos.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  editarElemento(id: number): void {
    this.enrutador.navigate(['/editar-elemento', id]);
  }



  
  obtenerActividad() {
    /* console.log(this.idActividad);
    // Aquí puedes usar el idActividad para obtener la actividad
    
    this.actividadServicio.obtenerActividadPorId(this.idActividad)
    .subscribe({
      next: (datos) => (this.actividad = datos),
      error: (errores: any) => console.log(errores),
    }); */
  }
}

 /*  private obtenerElementos() {
    // Consumir los datos del observable (suscribirse)
    this.elementoServicio.obtenerElementoLista().subscribe((datos) => {

}      this.elementos = datos;
    });
  } */

  
    /*
 asignarElemento(idActividad: number, idElemento: number) {
    this.actividadServicio
      .asignarElemento(idActividad, idElemento)
      .subscribe({
        next: (datos) => {
          console.log('Elemento asignado con éxito:', datos);
    Swal.fire({
            icon: 'success',
            title: 'Elemento asignado con éxito',
            showConfirmButton: true,
            timer: 3000,
          });

          (error: any) => {
            console.error('Error al asignar el elemento:', error);
         //Swal.fire({
              icon: 'error',
              title: 'Error al asignar el elemento',
              showConfirmButton: false,
              timer: 1500,
            });

          }
        } 
      });      
  }

  openDialog(idActividad: number): void {
   // this.dialog.open(ActividadAsignarElementoComponent, {
      width: '800px',
      data: { idActividad: idActividad, title: 'Buscar Elementos' },
    });
  } 

  */