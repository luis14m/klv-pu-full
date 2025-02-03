import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elemento } from '../models/elemento';

import { DBService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  private baseURL = 'http://localhost:8080/analisispu/elementos';

  constructor(private httpClient: HttpClient,
    private dbService: DBService
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
    await this.dbService.elementos.insert(elemento);
    console.log('📌 Elemento insertado:', elemento);
  }

  // Método para obtener todos los elementos de Rxdatabase
  async getElementos() {
    return await this.dbService.elementos.find().exec();
  }
}