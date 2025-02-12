import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Actividad } from '../../../shared/models/actividad.model';
import { ActividadService } from '../../services/actividad.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-agregar',
  templateUrl: './actividad-agregar.component.html',
  standalone: true, // 
  imports: [CommonModule,FormsModule], // Importar módulos necesarios
  
})
export default class ActividadAgregarComponent {
  
  actividad: Actividad = new Actividad();

  constructor(
    private actividadServicio: ActividadService,
    private enrutador: Router
  ) {}

  onSubmit() {
    //this.guardarActividad();
  }

 /*  guardarActividad() {
    this.actividadServicio.agregarActividad(this.actividad).subscribe({
      next: (datos) => {
        this.irListaActividades();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
 */
  irListaActividades() {
    this.enrutador.navigate(['/actividades']);
  }
}
