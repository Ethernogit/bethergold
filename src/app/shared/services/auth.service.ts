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
    const token = localStorage.getItem('token');
    return token !== null;
  }

  public loginUser(email: string, password: string): Observable<any> {
    console.log(email, password);
    console.log("loginUser");
    // const url = `${environment.api}/v1/auth/login`;
    // return this.http.post(url, { email, password });
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    return this.http.post<any>(environment.api+'/v1/auth/login',formData);

  }
}
