import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categoriaSeleccionada = new BehaviorSubject<string | null>(null);

  getCategoriaSeleccionada() {
    return this.categoriaSeleccionada.asObservable();
  }

  setCategoriaSeleccionada(id: string) {
    this.categoriaSeleccionada.next(id);
  }
}
