import { Component } from '@angular/core';
import { Elemento } from '../../../shared/models/elemento.model'; // Ensure Elemento is a class, not an interface
import { ElementoService } from '../../services/elemento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-elemento-editar',
  standalone: true, // 
  imports: [CommonModule,FormsModule], // Importar módulos necesarios
  templateUrl: './elemento-editar.component.html',
  
})
export class ElementoEditarComponent {

  elemento: Elemento = new Elemento();
  id: number;

  constructor(
    private elementoServicio: ElementoService,
    private enrutador: Router,
    private ruta: ActivatedRoute
  ) {}

  onSubmit() {
    //this.guardarElemento();
  }

  /* ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.elementoServicio.obtenerElementoPorId(this.id).subscribe({
      next: (datos) => this.elemento = datos,
      error: (errores: any) => console.log(errores)
    });
  }

 

  guardarElemento() {
    this.elementoServicio.actualizarElemento(this.id, this.elemento).subscribe({
      next: (datos) => this.irElementoLista(),
      error: (errores) => console.log(errores)
    });
  }

  irElementoLista() {
    this.enrutador.navigate(['/elementos']);
  }
 */}