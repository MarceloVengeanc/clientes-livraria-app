import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livros } from '../livros/livros';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private apiUrl = 'http://localhost:80/api/book/v1';

  constructor(private http: HttpClient) { }

  getLivros(page: number = 0, size: number = 12, direction: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token não encontrado');
      return throwError(() => new Error('Token não encontrado'));
    }

    const headers = {
      'Authorization': 'Bearer ' + token
    };

    return this.http.get<Livros>(this.apiUrl, { params, headers });
  }

  getAllLivros(): Observable<Livros> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token não encontrado');
      return throwError(() => new Error('Token não encontrado'));
    }
    const headers = {
      'Authorization': 'Bearer ' + token
    };
    return this.http.get<Livros>(this.apiUrl, { headers });
  }

}
