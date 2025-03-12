import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'; // Importa environment
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  public isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;
  }
  public loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${environment.api}/v1/auth/login`, body);
  }
}
