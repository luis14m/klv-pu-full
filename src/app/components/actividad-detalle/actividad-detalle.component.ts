import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { ElementoService } from '../../services/elemento.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Actividad } from '../../models/actividad';
import { Elemento } from '../../models/elemento';
import { ActividadAsignarElementoComponent } from '../actividad-asignar-elemento/actividad-asignar-elemento.component';
import { NgFor } from '@angular/common';
import { ActividadListaComponent } from '../actividad-lista/actividad-lista.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-actividad-detalle',
  standalone: true,
  imports: [FormsModule, NgForOf, CommonModule],
  templateUrl: './actividad-detalle.component.html',
 
  

})
export class ActividadDetalleComponent implements OnInit {



  actividad: Actividad;
  elemento: Elemento | undefined;
  idActividad: number;
  idElemento: number;
  elementos: Elemento[] = [];
  searchTerm: string='';
  routerLink: Router;


  constructor(
    private actividadServicio: ActividadService,
    private elementoServicio: ElementoService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    //public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerActividad();
    this.obtenerElementos();
  }
  
 /*  openDialog(idActividad: number): void {
    //this.dialog.open(ActividadAsignarElementoComponent, {
      width: '1080px',
      data: { idActividad: idActividad, title: 'Buscar Elementos' },
    });
  } */

  irAsignarElemento(id: number): void { 
  
    this.enrutador.navigate(['/asignar-elemento', id]);
  }
  
  irActividadesLista() {
    this.enrutador.navigate(['/']);
  }

  obtenerActividad() {
    this.idActividad = this.ruta.snapshot.params['id'];
    this.actividadServicio.obtenerActividadPorId(this.idActividad).subscribe({
      next: (datos) => (this.actividad = datos),
      error: (errores: any) => console.log(errores),
    });
  }

  obtenerElementos() {
    // Consumir los datos del observable (suscribirse)
    this.elementoServicio.obtenerElementoLista().subscribe((datos) => {
      this.elementos = datos;
      
    });
  }

filteredData() {
    return this.elementos.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

}
  

