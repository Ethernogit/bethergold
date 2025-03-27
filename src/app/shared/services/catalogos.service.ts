import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'; // Importa environment
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../interfaces/categoria';
import { Observable } from 'rxjs';
import { Subcategoria } from '../../interfaces/subcategoria';
import { Usuarios } from '../../interfaces/Usuarios';
import { Roles } from '../../interfaces/rolespermisos';
import { Permission } from '../../interfaces/rolespermisos';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  registrarCategoria(nombre: string) {
    const body = { nombre };
    return this.http.post<any>(`${environment.api}/v1/catalogos/categorias`, body);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.api}/v1/catalogos/categorias`);
  }

  eliminarCategoria(id: string) {
    return this.http.delete<any>(`${environment.api}/v1/catalogos/categoria/${id}`);
  }

  registrarSubcategoria(categoriaId: string, nombre: string) {
    const body = {
      categoriaId,
      nombre
    };
    return this.http.post<any>(`${environment.api}/v1/catalogos/subcategorias`, body);
  }

  getSubcategorias(idCategoria: string): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(`${environment.api}/v1/catalogos/subcategorias/${idCategoria}`);
  }

  eliminarSubcategoria(id: string) {
    return this.http.delete<any>(`${environment.api}/v1/catalogos/subcategorias/${id}`);
  }

  /**Usuarios */
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${environment.api}/v1/usuarios`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/catalogos/roles`);
  }

  getPermisos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/permisos/permisos`);
  }

  getPermisosByGroup(group: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/permisos/permisos/grupo/${group}`);
  }

  updateRolePermissions(roleId: string, permissions: any[]): Observable<any> {
    // Enviamos solo los IDs de los permisos
    const permissionIds = permissions.map(permission => permission._id);
    return this.http.put(`${this.apiUrl}/v1/catalogos/roles/${roleId}/permisos`, { permissions: permissionIds });
  }

  registrarRol(rol: { name: string; slug: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/catalogos/roles`, rol);
  }
}
