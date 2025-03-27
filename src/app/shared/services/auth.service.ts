import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'; // Importa environment
import { Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  public isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      return token !== null && this.isValidToken(token);
    }
    return false;
  }

  private isValidToken(token: string): boolean {
    try {
      // Decodificar el token (asumiendo que es un JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convertir a milisegundos
      const currentTime = Date.now();

      // Si el token ha expirado, limpiarlo
      if (currentTime >= expirationTime) {
        this.clearToken();
        return false;
      }

      return true;
    } catch (error) {
      this.clearToken();
      return false;
    }
  }

  public clearToken(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  public loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${environment.api}/v1/auth/login`, body).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      }),
      catchError(error => {
        this.clearToken();
        return of(error);
      })
    );
  }

  public logout(): void {
    this.clearToken();
  }
}
