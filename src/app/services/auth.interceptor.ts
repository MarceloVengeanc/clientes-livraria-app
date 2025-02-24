import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            console.warn('Token expirado ou inválido. Redirecionando para login...');
            this.authService.logout();
            this.router.navigate(['/login']);
          } else if (error.status === 500) {
            console.error('Erro interno no servidor:', error.message);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
