import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { Actividad } from '../../models/actividad';
import { ActividadService } from '../../services/actividad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad-agregar',
  templateUrl: './actividad-agregar.component.html',
  standalone: true,
  imports: [FormsModule],
  
})
export default class ActividadAgregarComponent {
  
  actividad: Actividad = new Actividad();

  constructor(
    private actividadServicio: ActividadService,
    private enrutador: Router
  ) {}

  onSubmit() {
    this.guardarActividad();
  }

  guardarActividad() {
    this.actividadServicio.agregarActividad(this.actividad).subscribe({
      next: (datos) => {
        this.irListaActividades();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  irListaActividades() {
    this.enrutador.navigate(['/actividades']);
  }
}
