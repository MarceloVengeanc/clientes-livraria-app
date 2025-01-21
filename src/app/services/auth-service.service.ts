import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authUrl = 'http://localhost:8080/api/auth/signin';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };

    return this.http.post<any>(this.authUrl, body);
  }
}
