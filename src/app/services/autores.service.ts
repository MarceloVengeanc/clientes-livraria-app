import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autores } from '../clientes/cadastro-pessoas/autores';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  private apiUrl = 'http://localhost:80/api/autores/v1';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): { headers: { Authorization: string } } {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado');
      throw new Error('Token não encontrado');
    }
    return {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
  }

  getAutores(page: number = 0, size: number = 20): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<any>(url, this.getAuthHeaders());
  }

  getTotalAutores(): Observable<any> {
    return this.http.get<Autores>(this.apiUrl, this.getAuthHeaders());
  }

  atualizaAutores(url: string, autores: Autores): Observable<Autores> {
    return this.http.put<Autores>(url, autores, this.getAuthHeaders());
  }

  getAllAutores(): Observable<any> {
    return this.http.get<Autores>(this.apiUrl + '/all', this.getAuthHeaders());
  }

  cadastrarCliente(autor: Autores): Observable<any> {
    return this.http.post<Autores>(this.apiUrl, autor, this.getAuthHeaders());
  }
}
