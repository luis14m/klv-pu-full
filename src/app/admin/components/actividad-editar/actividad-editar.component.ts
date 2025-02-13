import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../../shared/models/actividad.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actividad-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
],
  templateUrl: './actividad-editar.component.html'
})
export class ActividadEditarComponent implements OnInit {
  actividad: Actividad = new Actividad();
  idActividad!: number;

  constructor(
    private actividadServicio: ActividadService,
    private enrutador: Router,
    private ruta: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.idActividad = Number(this.ruta.snapshot.paramMap.get('id'));

    if (this.idActividad) {
      const actividad = await this.actividadServicio.getActividadById(this.idActividad);
      if (actividad) {
        this.actividad = actividad;
      }
    }
  }

  async onSubmit() {
    const actualizado = await this.actividadServicio.updateActividad(this.idActividad, this.actividad);

    if (actualizado) {
      alert('Actividad actualizada con éxito');
      this.enrutador.navigate(['/admin/actividades']);
    }
  }
  irActividadLista() {
    this.enrutador.navigate(['/actividad-detalle', this.idActividad]);
  }
}
