import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadService} from '../../services/actividad.service';
import { ElementoService } from '../../services/elemento.service'; // Importa el servicio de elementos
import { Actividad } from '../../../shared/models/actividad.model';
import { Elemento } from '../../../shared/models/elemento.model'; // Importa la interfaz Elemento
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actividad-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.css'],
 
 
})
export class ActividadDetalleComponent implements OnInit {
  actividad: Actividad | null = null;
  elementos: Elemento[] = [];
  elementosAsignados: Elemento[] = [];
  mostrarAsignarElemento: boolean = false;
  loading: boolean = false; // Add loading state property to your component
  
  searchTerm:string='';

  columns = [
    { prop: 'codigo', name: 'Codigo' },
    { prop: 'nombre', name: 'Nombre' },
  ];

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private elementoService: ElementoService // Inyecta el servicio de elementos
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadActividad(Number(id));
      await this.loadElementosAsignados(Number(id));
    }
  }

  async loadActividad(id: number) {
    try {
      this.actividad = await this.actividadService.getActividadById(id);
    } catch (error) {
      console.error('Error cargando actividad:', error);
    }
  }

  async loadElementosDisponibles() {
    try {
      this.elementos = await this.elementoService.getElementosNoAsignados(this.actividad?.id!);
    } catch (error) {
      console.error('Error cargando elementos:', error);
    }
  }

  async loadElementosAsignados(actividadId: number) {
    try {
      this.elementosAsignados = await this.actividadService.getElementosAsignados(actividadId);
    } catch (error) {
      console.error('Error cargando elementos asignados:', error);
    }
  }

  async toggleAsignarElemento() {
    this.mostrarAsignarElemento = !this.mostrarAsignarElemento;
    if (this.mostrarAsignarElemento) {
      await this.loadElementosDisponibles();
    }
  }

  async asignarElemento(elemento: Elemento) {
    if (!this.actividad?.id || !elemento?.id) {
      console.warn('Actividad ID or Elemento ID is missing');
      return;
    }
  
    try {
      this.loading = true; // Add loading state property to your component
      await this.actividadService.asignarElemento(this.actividad.id, elemento.id);

      this.actividad.precio_unitario+=elemento.precio_unitario;
      
      this.elementos = this.elementos.filter(e => e.id !== elemento.id);
      this.elementosAsignados = [...this.elementosAsignados, elemento];
      
      //alert('Elemento asignado correctamente');
      
    } catch (error: unknown) {
      console.error('Error asignando elemento:', error);
      //alert('Error al asignar elemento');
    } finally {
      this.loading = false;
    }
  }

  async desasignarElemento(elementoId: number) {
    if (!this.actividad) return;

    try {
      await this.actividadService.desasignarElemento(this.actividad.id, elementoId);
      
      // Actualizar listas
      const elemento = this.elementosAsignados.find(e => e.id === elementoId);
      if (elemento) {
        this.elementosAsignados = this.elementosAsignados.filter(e => e.id !== elementoId);
        this.elementos = [...this.elementos, elemento];
      }
      
      //alert('Elemento desasignado correctamente');
    } catch (error) {
      console.error('Error desasignando elemento:', error);
      //alert('Error al desasignar elemento');
    }
  }

  filteredData() {
    return this.elementos.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
  
 /*  openDialog(idActividad: number): void {
    //this.dialog.open(ActividadAsignarElementoComponent, {
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


    */