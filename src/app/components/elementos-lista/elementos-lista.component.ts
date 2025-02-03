import { Component } from '@angular/core';
import { Elemento } from '../../models/elemento'; // Ensure the path is correct and the file exists
import { ElementoService } from '../../services/elemento.service'; // Assuming you have an ElementoService similar to ActividadService
import { Router } from '@angular/router';


@Component({
  selector: 'app-elementos-lista',
  standalone: false,
  templateUrl: './elementos-lista.component.html',
})
export class ElementosListaComponent {

  elementos: Elemento[] = [];
  searchTerm: string = '';

  columns = [
    { prop: 'codigo', name: 'Codigo' },
    { prop: 'nombre', name: 'Nombre' },
  ];

  constructor(
    private elementoServicio: ElementoService, 
    private enrutador: Router
  ) {}

  ngOnInit() {
    // Cargamos los Elementos
    this.obtenerElementos();
  }

  private obtenerElementos() {
    // Consumir los datos del observable (suscribirse)
    this.elementoServicio.obtenerElementoLista().subscribe((datos) => {
      this.elementos = datos;
    });
  }

  filteredData() {
    return this.elementos.filter((item) =>
      Object.values(item).some((value) =>
        value !== null && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  editarElemento(id: number): void {
    this.enrutador.navigate(['/editar-elemento', id]);
  }

  eliminarElemento(id: number) {
    this.elementoServicio.eliminarElemento(id).subscribe({
      next: (datos) => this.obtenerElementos(),
      error: (errores) => console.log(errores),
    });
  }

}
