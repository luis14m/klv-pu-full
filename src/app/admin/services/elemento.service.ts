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
}
  /* private baseURL = 'http://localhost:8080/apu/elementos';

  constructor(private httpClient: HttpClient,
    //private dbService: DBService
  ) { }

  obtenerElementoLista(): Observable<Elemento[]> {
    return this.httpClient.get<Elemento[]>(`${this.baseURL}`);
  }

  crearElemento(elemento: Elemento): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, elemento);
  }

  obtenerElementoPorId(id: number): Observable<Elemento> {
    return this.httpClient.get<Elemento>(`${this.baseURL}/${id}`);
  }

  actualizarElemento(id: number, elemento: Elemento): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, elemento);
  }

  eliminarElemento(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

   // Método para agregar un nuevo elemento
   async addElemento(elemento: Elemento) {
    //await this.dbService.elementos.insert(elemento);
    console.log('📌 Elemento insertado:', elemento);
  }

  // Método para obtener todos los elementos de Rxdatabase
  async getElementos() {
   // return await this.dbService.elementos.find().exec();
  } */