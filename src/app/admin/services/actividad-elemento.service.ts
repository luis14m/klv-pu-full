import { Injectable, inject } from '@angular/core';
import { Actividad } from '../../shared/models/actividad.model';
import { SupabaseService } from '../../shared/services/supabase.service';
import { Elemento } from '../../shared/models/elemento.model';


@Injectable({
  providedIn: 'root',
})
export class ActividadElementoService {
   //   ***Supabase***
  
    private supabase = inject(SupabaseService).supabaseClient;
  // Método para obtener todos los registros de la tabla actividad_elemento
  async getActividadesConElementos(): Promise<any[]> {
    
    const { data, error } = await this.supabase
      .from('actividad_elemento')
      .select(`
        actividad_id,
        actividades:actividad_id (nombre),
        elemento_id,
        elementos:elemento_id (nombre),
        cantidad
      `);


    if (error) {
      console.error('Error fetching actividad_elemento:', error);
      throw error;
    }

    return data || [];
  }
}