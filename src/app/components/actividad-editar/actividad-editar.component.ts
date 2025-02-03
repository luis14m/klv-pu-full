import { Component, Inject } from '@angular/core';
import { Actividad } from '../../models/actividad';
import { ActividadService } from '../../services/actividad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Elemento } from '../../models/elemento';
import { ElementoService } from '../../services/elemento.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad-editar',
  standalone: false,
  templateUrl: './actividad-editar.component.html'

})

export class ActividadEditarComponent {

  actividad: Actividad = new Actividad();
 
  idActividad: number;
  


  constructor(
    private actividadServicio: ActividadService,
    private enrutador: Router,
    private ruta: ActivatedRoute) { }

  async ngOnInit() {

    this.obtenerActividad();
  
  }

  onSubmit() {

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

}
