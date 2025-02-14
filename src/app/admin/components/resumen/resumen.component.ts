import { Component, OnInit } from '@angular/core';
import { ActividadElementoService } from '../../services/actividad-elemento.service';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../../shared/models/actividad.model';

@Component({
  selector: 'app-actividad-elemento-lista',
  templateUrl: './resumen.component.html',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
],
})
export class ResumenComponent implements OnInit {



  actividadesConElementos: any[] = []; // Array para guardar los datos estructurados

  actividadService: ActividadService;
  actividades: any;
  actividad: Actividad | null;

  constructor(private actividadElementoService: ActividadElementoService) {}

  ngOnInit(): void {
    this.loadActividadConElementos();
  }
  onSubmit() {

  }

  async loadActividadConElementos(): Promise<void> {
    try {
      // Obtener los datos de la tabla actividad_elemento con joins
      const data = await this.actividadElementoService.getActividadesConElementos();

      // Procesar los datos para estructurarlos
      this.actividadesConElementos = this.estructurarDatos(data);
    } catch (error) {
      console.error('Error loading actividades:', error);
    }
  }

  // Método para estructurar los datos
  estructurarDatos(data: any[]): any[] {
    const actividadesMap = new Map<number, any>();

    data.forEach((item) => {
      const actividadId = item.actividad_id;
      const actividadNombre = item.actividades.nombre;
      const elementoNombre = item.elementos.nombre;
      const cantidad = item.cantidad;

      // Si la actividad no está en el mapa, la agregamos
      if (!actividadesMap.has(actividadId)) {
        actividadesMap.set(actividadId, {
          nombre: actividadNombre,
          elementos: [],
        });
      }

      // Agregar el elemento a la actividad correspondiente
      actividadesMap.get(actividadId).elementos.push({
        nombre: elementoNombre,
        cantidad: cantidad,
      });
    });

    // Convertir el mapa a un array
    return Array.from(actividadesMap.values());
  }


  exportToExcel(): void {
    
    const table = document.getElementById('table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'actividades.xlsx');
  }
  
}

