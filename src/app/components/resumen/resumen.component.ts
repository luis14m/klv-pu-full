import { Component } from '@angular/core';
import { Actividad } from '../../models/actividad';
import { ActividadService } from '../../services/actividad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementoService } from '../../services/elemento.service';
import { Elemento } from '../../models/elemento';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-resumen',
  standalone: false,
  templateUrl: './resumen.component.html',
})
export class ResumenComponent {
  actividades: Actividad[] = [];

  elemento: Elemento;
  idActividad: number;
  idElemento: number;
  //searchTerm: any= '';

  elementos: Elemento[] = [];

  constructor(
    private actividadServicio: ActividadService,
    private elementoServicio: ElementoService,
    private enrutador: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerActividades();
  }

  private obtenerActividades() {
    // Consumir los datos del observable (suscribirse)
    this.actividadServicio.obtenerActividadLista().subscribe((datos) => {
      this.actividades = datos;
    });
  }

  exportToExcel(): void {
    
    const table = document.getElementById('table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'actividades.xlsx');
  }
  onSubmit() {
    
  }
}

