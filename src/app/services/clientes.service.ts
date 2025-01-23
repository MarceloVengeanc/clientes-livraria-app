import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Clientes } from '../clientes/cadastro-clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'http://localhost:80/api/person/v1';

  constructor(private http: HttpClient) { }

  getClientes(page: number = 0, size: number = 12, direction: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token não encontrado');
      return throwError(() => new Error('Token não encontrado'));
    }

    console.log(token, 'token aqui');
    const headers = {
      'Authorization': 'Bearer ' + token
    };

    return this.http.get<any>(this.apiUrl, { params, headers });
  }

  getAllClientes(): Observable<Clientes> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token não encontrado');
      return throwError(() => new Error('Token não encontrado'));
    }
    const headers = {
      'Authorization': 'Bearer ' + token
    };
    return this.http.get<Clientes>(this.apiUrl, { headers });
  }


}
