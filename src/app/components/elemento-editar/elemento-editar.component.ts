import { Component } from '@angular/core';
import { Elemento } from '../../models/elemento';
import { ElementoService } from '../../services/elemento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-elemento-editar',
  standalone: false,
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

  ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.elementoServicio.obtenerElementoPorId(this.id).subscribe({
      next: (datos) => this.elemento = datos,
      error: (errores: any) => console.log(errores)
    });
  }

  onSubmit() {
    this.guardarElemento();
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
}