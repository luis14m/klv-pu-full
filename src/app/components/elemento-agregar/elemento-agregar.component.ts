import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Elemento } from '../../models/elemento';
import { ElementoService } from '../../services/elemento.service';

@Component({
  selector: 'app-elemento-agregar',
  standalone: false,
  templateUrl: './elemento-agregar.component.html',
  styleUrl: './elemento-agregar.component.css'
})
export class ElementoAgregarComponent {
  elemento: Elemento = new Elemento();

  constructor(
    private elementoServicio: ElementoService,
    private enrutador: Router
  ) {}

  onSubmit() {
    this.guardarElemento();
  }

  guardarElemento() {
    this.elementoServicio.crearElemento(this.elemento).subscribe({
      next: (datos) => {
        this.irListaElementos();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  irListaElementos() {
    this.enrutador.navigate(['/elementos']);
  }
}
