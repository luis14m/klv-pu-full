import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ElementoService } from '../../services/elemento.service';
import { Elemento } from '../../../shared/models/elemento.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-elemento-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './elemento-editar.component.html'
})
export class ElementoEditarComponent implements OnInit {
  elemento: Elemento = new Elemento();
  idElemento!: number;

  constructor(
    private elementoServicio: ElementoService,
    private enrutador: Router,
    private ruta: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.idElemento = Number(this.ruta.snapshot.paramMap.get('id'));

    if (this.idElemento) {
      const elemento = await this.elementoServicio.getElementoById(this.idElemento);
      if (elemento) {
        this.elemento = elemento;
      }
    }
  }

  async onSubmit() {
    const actualizado = await this.elementoServicio.updateElemento(this.idElemento, this.elemento);

    if (actualizado) {
      alert('Elemento actualizado con éxito');
      this.enrutador.navigate(['/admin/elementos']);
    }
  }

  irElementoLista() {
    this.enrutador.navigate(['/elemento-detalle', this.idElemento]);
  }
}

 