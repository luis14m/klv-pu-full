import { inject, Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Elemento } from '../../shared/models/elemento.model';
import { SupabaseService } from '../../shared/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ElementoService {
  //   ***Supabase***

  private supabase = inject(SupabaseService).supabaseClient;

  async insertElemento(elemento: Elemento): Promise<Elemento | null> { 
    try {
      const { data, error } = await this.supabase
        .from('elementos')
        .insert([elemento])
        .select()
        .single();
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error al insertar elemento:', error);
      throw error;
    }
  }

  // Obtener todos los elementos
  async getElementos(): Promise<Elemento[]> {
    const { data, error } = await this.supabase
      .from('elementos')
      .select('*');

    if (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }

    return data || [];
  }

  // elementos.service.ts
  async getElementosNoAsignados(actividadId: number): Promise<Elemento[]> {
    const { data, error } = await this.supabase
      .from('elementos')
      .select('*')
      .not('id', 'in', `(${await this.getIdsAsignados(actividadId)})`);

    if (error) throw error;
    return data;
  }

  private async getIdsAsignados(actividadId: number): Promise<string> {
    const { data, error } = await this.supabase
      .from('actividad_elemento')
      .select('elemento_id')
      .eq('actividad_id', actividadId);

    if (error) throw error;
    return data.map(item => item.elemento_id).join(',');
  }

  async updateElemento(id: number, elemento: Partial<Elemento>): Promise<Elemento | null> {
    try {
      const { data, error } = await this.supabase
        .from('elementos')
        .update(elemento)
        .eq('id', id)
        .select()
        .single();
  
      if (error) {
        console.error('Error updating elemento:', error);
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error al actualizar elemento:', error);
      throw error;
    }
  }

    async getElementoById(id: number): Promise<Elemento| null> {
      const { data, error } = await this.supabase
        .from('elementos')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        console.error('Error fetching actividad:', error);
        throw error;
      }
  
      return data || null;
    }
  
  async deleteElemento(id: number): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('elementos')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error('Error deleting elemento:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error al eliminar elemento:', error);
      throw error;
    }
  }
}
