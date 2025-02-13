import { Injectable, inject } from '@angular/core';
import { Actividad } from '../../shared/models/actividad.model';
import { SupabaseService } from '../../shared/services/supabase.service';
import { Elemento } from '../../shared/models/elemento.model';


@Injectable({ providedIn: 'root' })
export class ActividadService {

  //   ***Supabase***

  private supabase = inject(SupabaseService).supabaseClient;

  // Método para insertar una nueva actividad
  async insertActividad(actividad: Actividad): Promise<Actividad | null> {

     // Elimina la propiedad 'id' del objeto actividad
    
    const { data, error } = await this.supabase
      .from('actividades') // Nombre de la tabla
      .insert([actividad]) // Inserta la actividad
      .select(); // Devuelve la actividad insertada
      

    if (error) {
      console.error('Error en insertar actividad:', error);
      throw error;
    }

    return data ? data[0] : null; // Devuelve la actividad insertada o `null`
  }
  async getActividades(): Promise<Actividad[]> {

    let { data, error } = await this.supabase
      .from('actividades')
      .select('*')

    if (error) {
      console.error('Error en listar', error);
      throw error;
    }

    return data || [];

  }
  async getActividadById(id: number): Promise<Actividad| null> {
    const { data, error } = await this.supabase
      .from('actividades')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching actividad:', error);
      throw error;
    }

    return data || null;
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

  async updateActividad(id: number, actividad: Partial<Actividad>): Promise<Actividad | null> {
    const { data, error } = await this.supabase
      .from('actividades')
      .update(actividad)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating actividad:', error);
      throw error;
    }

    return data;
  }

  async deleteActividad(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('actividades')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting actividad:', error);
      throw error;
    }
  }
} 