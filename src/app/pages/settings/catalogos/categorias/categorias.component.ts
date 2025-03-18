import { Component, inject, ViewChild } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ListadoComponent } from "./listado/listado.component";
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
@Component({
  selector: 'app-categorias',
  imports: [ListadoComponent,SubcategoriasComponent,MatIconModule,MatButtonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  readonly dialog = inject(MatDialog);
  @ViewChild(ListadoComponent) listadoComponent!: ListadoComponent;

  constructor() { }

  openModalRegistroCategorias(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.listadoComponent.recargarListado();
      }
    });
  }
  openModalRegistroSubcategorias() {
    // Open modal
  }
}