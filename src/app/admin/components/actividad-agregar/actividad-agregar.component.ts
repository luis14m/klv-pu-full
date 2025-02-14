import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Actividad as  ActividadCreate } from '../../../shared/models/actividad.model';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-actividad-agregar',
  templateUrl: './actividad-agregar.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar módulos necesarios
})
export class ActividadAgregarComponent {
  
  actividad:  ActividadCreate = new  ActividadCreate(); // Objeto para almacenar los datos del formulario

  constructor(
    private actividadServicio: ActividadService, // Servicio para interactuar con Supabase
    private enrutador: Router // Router para navegar entre componentes
  ) {}

  // Método para manejar el envío del formulario
  async onSubmit() {
     // Asegúrate de que el objeto actividad no tenga un valor para 'id'
   

    try {
      // Llama al servicio para crear la actividad en Supabase
      const actividadCreada = await this.actividadServicio.insertActividad(this.actividad);

      if (actividadCreada) {
        alert('Actividad creada con éxito'); // Muestra un mensaje de éxito
        this.irListaActividades(); // Redirige a la lista de actividades
      } else {
        alert('Error al crear la actividad'); // Muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error al crear la actividad:', error);
      alert('Ocurrió un error al crear la actividad'); // Muestra un mensaje de error
    }
  }

  // Método para redirigir a la lista de actividades
  irListaActividades() {
    this.enrutador.navigate(['/admin/actividades']);
  }
}

