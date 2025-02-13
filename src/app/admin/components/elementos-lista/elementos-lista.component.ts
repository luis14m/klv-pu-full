import { Component, OnInit } from '@angular/core';
import { Elemento } from '../../../shared/models/elemento.model';
import { ElementoService } from '../../services/elemento.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elementos-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './elementos-lista.component.html',
})
export class ElementosListaComponent implements OnInit {

  elementos: Elemento[] = [];
  elemento: Elemento;
  searchTerm: string = '';

  columns = [
    { prop: 'codigo', name: 'Código' },
    { prop: 'nombre', name: 'Nombre' },
  ];

  constructor(
    private elementoService: ElementoService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadElementos(); // Carga los elementos al iniciar el componente
  }

  async loadElementos() {
    try {
      this.elementos = await this.elementoService.getElementos(); // Obtiene los elementos
    } catch (error) {
      console.error('Error loading elementos:', error);
    }
  }

  filteredData() {
    return this.elementos.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  editarElemento(id: number): void {
    this.router.navigate(['/admin/elemento-editar', id]);
  }
}