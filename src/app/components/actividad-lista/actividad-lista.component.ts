import { Component, Pipe, PipeTransform } from '@angular/core';
import { Actividad } from '../../models/actividad';
import { ActividadService } from '../../services/actividad.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actividad-lista',
  standalone: false,
  templateUrl: './actividad-lista.component.html',
})
export class ActividadListaComponent {

  actividades: Actividad[] = [];
  searchTerm: string = '';

  columns = [
    { prop: 'codigo', name: 'Codigo' },
    { prop: 'nombre', name: 'Nombre' },
  ];

  constructor(
    private actividadServicio: ActividadService,
    private enrutador: Router
  ) {}

  ngOnInit() {
    // Cargamos las Actividades
    this.obtenerActividades();
  }

  private obtenerActividades() {
    // Consumir los datos del observable (suscribirse)
    this.actividadServicio.obtenerActividadLista().subscribe((datos) => {
      this.actividades = datos;
    });
  }

  filteredData() {
    return this.actividades.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
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
  detalleActividad(id: number): void {
    this.enrutador.navigate(['/actividad-detalle', id]);
  }
}
