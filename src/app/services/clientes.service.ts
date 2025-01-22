import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../clientes/cadastro-clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'http://localhost:80/api/person/v1';

  constructor(private http: HttpClient) { }

  getClientes(page: number = 0, size: number = 12, direction: string = 'asc'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    return this.http.get<any>(this.apiUrl, { params });
  }
}
