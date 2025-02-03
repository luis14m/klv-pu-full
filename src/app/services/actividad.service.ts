import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad';
import { Elemento } from '../models/elemento';
import { DBService } from './db.service';


@Injectable({
  providedIn: 'root',
})
export class ActividadService {

  private urlBase = 'http://localhost:8080/apu/actividades';

  constructor(private clienteHttp: HttpClient,
    private dbService: DBService
  ) { }

  obtenerActividadLista(): Observable<Actividad[]> {
    return this.clienteHttp.get<Actividad[]>(this.urlBase);
  }
  agregarActividad(actividad: Actividad): Observable<Object> {

    return this.clienteHttp.post(this.urlBase, actividad);
  }

  obtenerActividadPorId(id: number): Observable<Actividad> {
    return this.clienteHttp.get<Actividad>(`${this.urlBase}/${id}`);
  }

  asignarElemento(actividadId: number, elementoId: number): Observable<Object> {
    const url = `${this.urlBase}/${actividadId}/elementos/${elementoId}`;
    return this.clienteHttp.post(url, {});
  }

  editarActividad(id: number, actividad: Actividad): Observable<Object> {
    return this.clienteHttp.put(`${this.urlBase}/${id}`, actividad);
  }

  eliminarActividad(id: number): Observable<Object> {
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

  //          ***RxDatabase***

  async addActividad(actividad: Actividad) {
    await this.dbService.actividades.insert(actividad);
    console.log('📌 Actividad insertada:', actividad);
  }
  async getActividades() {
    return await this.dbService.actividades.find().exec();
  }

  async addElementoToActividad(actividadId: string, elemento: Elemento) {
    const actividad = await this.dbService.actividades.findOne(actividadId).exec();
    if (actividad) {
      const updatedElementos = [...actividad.elementos, elemento];
      await actividad.update({ $set: { elementos: updatedElementos } });
      console.log(`🟢 Elemento agregado a la actividad ${actividadId}:`, elemento);
    }
  }

}
