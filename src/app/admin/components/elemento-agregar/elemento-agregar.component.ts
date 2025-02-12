import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Elemento } from '../../../shared/models/elemento.model';
import { ElementoService } from '../../services/elemento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elemento-agregar',
  standalone: true, // 
  imports: [CommonModule,FormsModule], // Importar módulos necesarios
  templateUrl: './elemento-agregar.component.html',
  
})
export class ElementoAgregarComponent {
  elemento: Elemento = new Elemento();

  constructor(
    private elementoServicio: ElementoService,
    private enrutador: Router
  ) {}

  onSubmit() {
    //this.guardarElemento();
  }

  /* guardarElemento() {
    this.elementoServicio.crearElemento(this.elemento).subscribe({
      next: (datos) => {
        this.irListaElementos();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
 */
  irListaElementos() {
    this.enrutador.navigate(['/elementos']);
  }
}
