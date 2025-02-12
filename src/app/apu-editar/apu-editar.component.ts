import { Component } from '@angular/core';
import { Actividad } from '../../../../models/actividad';
import { ActividadService } from '../../../../services/actividad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Elemento } from '../../models/elemento.model';
import { ElementoService } from '../../../../services/elemento.service';

import { OnInit } from '@angular/core';
import { CommonModule,} from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-apu-editar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './apu-editar.component.html',

})

export class ApuEditarComponent implements OnInit {

  actividad: Actividad = new Actividad();
  elemento: Elemento;
  idActividad: number;
  idElemento: number;
  elementos: Elemento[] = [];
  actividadServicio: any;


  constructor(
    private enrutador: Router,
    private ruta: ActivatedRoute) { }
    
  

  async ngOnInit() {

    this.obtenerActividad();

    //await this.actividadService.addActividad(this.actividad);



  }

  onSubmit() {

    //this.calcular();
    this.guardarActividad();

  }


  obtenerActividad() {
    this.idActividad = this.ruta.snapshot.params['id'];
    console.log(this.idActividad);
    this.actividadServicio.obtenerActividadPorId(this.idActividad).subscribe({
      next: (datos) => (this.actividad = datos),

      error: (errores: any) => console.log(errores),
    });

  }

 /*  calcular() {
    if (!this.actividad || !this.actividad.elementos) {
      console.warn('No hay actividad o elementos para calcular');
      return;
    }

    let sumaPrecioTotal = 0;

    for (let elemento of this.actividad.elementos) {
      // Calcular precio total de cada elemento
      elemento.precioTotal = elemento.cantidad * elemento.precioUnitario;

      // Acumular suma total
      sumaPrecioTotal += elemento.precioTotal;
    }

    // Actualizar totales de la actividad

    this.actividad.precioUnitario = this.actividad.precioTotal / this.actividad.cantidad;
    this.actividad.precioTotal = sumaPrecioTotal;

    console.log('Cálculos actualizados:', {
      elementosTotales: this.actividad.elementos.map(e => e.precioTotal),
      actividadTotal: this.actividad.precioTotal,
      precioUnitario: this.actividad.precioUnitario
    });
  } */

  guardarActividad() {

    this.actividadServicio.editarActividad(this.idActividad, this.actividad).subscribe(
      {
        next: (datos) => this.irActividadLista(),
        error: (errores) => console.log(errores)
      }
    );
  }

  irActividadLista() {
    this.enrutador.navigate(['/actividad-detalle', this.idActividad]);
  }

  /* async addTodo() {
    if (this.newTodoTitle.trim()) {
      await this.db.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  } */


}
