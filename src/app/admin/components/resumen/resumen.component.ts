import { Component, OnInit } from '@angular/core';
import { ActividadElementoService } from '../../services/actividad-elemento.service';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

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
  actividadElementos: any[] = [];

  constructor(private actividadElementoService: ActividadElementoService) {}

  ngOnInit(): void {
    this.loadActividadElementos();
  }

  async loadActividadElementos(): Promise<void> {
    try {
      this.actividadElementos = await this.actividadElementoService.getActividadElementos();
    } catch (error) {
      console.error('Error loading actividad_elemento:', error);
    }
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

