import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:80/auth/signin';
  private tokenKey = 'authToken';
  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<{ accessToken: string }>(this.authUrl, body).pipe(
      tap((response) => {
        if (response?.accessToken) {
          localStorage.setItem(this.tokenKey, response.accessToken);
        } else {
          console.warn('Nenhum token retornado pela API.');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
