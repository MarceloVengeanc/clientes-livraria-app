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

  getLivros(page: number = 0, size: number = 5, direction: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    return this.http.get<Livros>(this.apiUrl, { params, ...this.getAuthHeaders() });
  }

  getTotalLivros(): Observable<any> {
    return this.http.get<Livros>(this.apiUrl, this.getAuthHeaders());
  }
}
