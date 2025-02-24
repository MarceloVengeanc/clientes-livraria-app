import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Clientes } from '../clientes/cadastro-pessoas/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'http://localhost:80/api/person/v1';

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

  getClientes(page: number = 0, size: number = 12, direction: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    return this.http.get<any>(this.apiUrl, { params, ...this.getAuthHeaders() });
  }

  getClientesByName(firstName: string, page: number = 0, size: number = 5, direction: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    const url = `${this.apiUrl}/findPersonByName/${firstName}`;

    return this.http.get<any>(url, { params, ...this.getAuthHeaders() });
  }

  cadastrarCliente(cliente: Clientes): Observable<any> {
    return this.http.post<Clientes>(this.apiUrl, cliente, this.getAuthHeaders());
  }

  atualizaCliente(url: string, cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(url, cliente, this.getAuthHeaders());
  }

  excluirCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.getAuthHeaders());
  }

  getTotalPessoas(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Clientes>(url, this.getAuthHeaders());
  }

  getTotalClientes(): Observable<any> {
    const url = `${this.apiUrl}/cliente`;
    return this.http.get<Clientes>(url, this.getAuthHeaders());
  }

  getTotalAutores(): Observable<any> {
    return this.http.get<Clientes>(this.apiUrl + '/autor', this.getAuthHeaders());
  }

}


