import {Injectable,inject } from '@angular/core';
import { Actividad } from '../../shared/models/actividad.model';
import { SupabaseService } from '../../shared/services/supabase.service';
import { Elemento } from '../../shared/models/elemento.model';


@Injectable({ providedIn: 'root' })
export class ActividadService {

  //   ***Supabase***

  private supabase = inject(SupabaseService).supabaseClient;

  // Método para insertar una nueva actividad
  async insertActividad(actividad: Actividad): Promise<Actividad | null> {
    const { data, error } = await this.supabase
      .from('actividades') // Nombre de la tabla
      .insert([actividad]) // Inserta la actividad
      .select(); // Devuelve la actividad insertada

    if (error) {
      console.error('Error inserting actividad:', error);
      throw error;
    }

    return data ? data[0] : null; // Devuelve la actividad insertada o `null`
  }
  async getActividades(): Promise<Actividad[]> {
    
    let { data, error } = await this.supabase
    .from('actividades')
    .select('*')

    if (error) {
      console.error('Error', error);
      throw error;
    }

    return data || [];
  
  }
  async getActividadById(id: number): Promise<Actividad | null> {
    const { data, error } = await this.supabase
      .from('actividades')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching actividad:', error);
      throw error;
    }

    return  data || null;
  }
  // actividades.service.ts
async asignarElemento(actividadId: number, elementoId: number): Promise<void> {
  const { error } = await this.supabase
    .from('actividad_elemento')
    .insert([{ 
      actividad_id: actividadId,
      elemento_id: elementoId,
      
    }]);

  if (error) throw error;
}

async desasignarElemento(actividadId: number, elementoId: number): Promise<void> {
  const { error } = await this.supabase
    .from('actividad_elemento')
    .delete()
    .eq('actividad_id', actividadId)
    .eq('elemento_id', elementoId);

  if (error) throw error;
}

async getElementosAsignados(actividadId: number): Promise<Elemento[]> {
  const { data, error } = await this.supabase
    .from('actividad_elemento')
    .select(`
      elemento:elementos (
        id,
        codigo,
        nombre,
        unidad,
        precio_unitario
      )
    `)
    .eq('actividad_id', actividadId);

  if (error) throw error;

  return data.map(item => item.elemento as unknown as Elemento);
}
}



  /* 
                  ***localhost***
  
    private baseURL = 'http://localhost:8080/apu/elementos';
  
    constructor(private httpClient: HttpClient,
      //private dbService: DBService
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
   
  
  
  */


  //          ***RxDatabase***

  /* async addActividad(actividad: Actividad) {
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
  } */
