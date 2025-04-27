import { Injectable } from '@angular/core';
import { Subcategoria } from '../../interfaces/subcategoria';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {
  constructor(private http: HttpClient) { }
  getformproducto(): Observable<any> {
    return this.http.get(`${environment.api}/v1/formularios/productos`);
  }
}
