import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Actividad } from '../../../shared/models/actividad.model';
import { ActividadService } from '../../services/actividad.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ActividadDetalleComponent } from '../actividad-detalle/actividad-detalle.component';


@Component({
  selector: 'app-actividad-lista',
  standalone: true, // 
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink,
    RouterModule,
  
  ], // Importar módulos necesarios
  templateUrl: './actividad-lista.component.html',
})
export class ActividadListaComponent implements OnInit{

  actividades: Actividad[]=[];
  actividad:Actividad;
  searchTerm: string = '';

  columns = [
    { prop: 'codigo', name: 'Codigo' },
    { prop: 'nombre', name: 'Nombre' },
  ];

  constructor(
    private actividadService: ActividadService,
    private enrutador: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadActividades(); // Carga las actividades al iniciar el componente
  }

  async loadActividades() {
    try {
      this.actividades = await this.actividadService.getActividades(); // Obtiene las actividades
    } catch (error) {
      console.error('Error loading actividades:', error);
    }
  }
  filteredData() {
    return this.actividades.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  } 
}
  /*
  private obtenerActividades() {
    // Consumir los datos del observable (suscribirse)
  
      //this.actividadService.getActividades();
  }
 
  editarActividad(id: number): void {
    this.enrutador.navigate(['/actividad-editar', id]);
  }
  eliminarActividad(id: number) {
     this.actividadServicio.eliminarActividad(id).subscribe({
      next: (datos) => this.obtenerActividades(),
      error: (errores) => console.log(errores),
    });
  }
}

  private obtenerActividades() {
    // Consumir los datos del observable (suscribirse)
    this.actividadServicio.obtenerActividadLista().subscribe((datos) => {
      this.actividades = datos;
    });
  }


  eliminarActividad(id: number) {
    this.actividadServicio.eliminarActividad(id).subscribe({
      next: (datos) => this.obtenerActividades(),
      error: (errores) => console.log(errores),
    });
  }
  detalleActividad(id: number): void {
    console.log(id);
    this.enrutador.navigate(['/actividad-detalle', id]);
  }
}
*/