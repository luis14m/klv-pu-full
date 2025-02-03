import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { ElementoService } from '../../services/elemento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../models/actividad';
import { Elemento } from '../../models/elemento';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ActividadAsignarElementoComponent } from '../actividad-asignar-elemento/actividad-asignar-elemento.component';

@Component({
  selector: 'app-actividad-detalle',
  standalone: false,

  templateUrl: './actividad-detalle.component.html',
})
export class ActividadDetalleComponent implements OnInit {



  actividad: Actividad;
  elemento: Elemento;
  idActividad: number;
  idElemento: number;
  elementos: Elemento[] = [];
  searchTerm: string='';


  constructor(
    private actividadServicio: ActividadService,
    private elementoServicio: ElementoService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerActividad();
    this.obtenerElementos();
  }
  
  openDialog(idActividad: number): void {
    this.dialog.open(ActividadAsignarElementoComponent, {
      width: '1080px',
      data: { idActividad: idActividad, title: 'Buscar Elementos' },
    });
  }

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
  

