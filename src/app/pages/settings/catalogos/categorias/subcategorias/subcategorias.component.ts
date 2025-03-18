import { Component, inject, ViewChild } from '@angular/core';
import { CrearComponent } from './crear/crear.component';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ListadoSubcatComponent } from './listado/listadoSubcat.component';
import { CategoriasService } from '../categorias.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-subcategorias',
  imports: [MatIconModule, MatButtonModule,ListadoSubcatComponent,MatSnackBarModule],
  templateUrl: './subcategorias.component.html',
  styleUrl: './subcategorias.component.css'
})
export class SubcategoriasComponent  {
  private _snackBar = inject(MatSnackBar);
  constructor(
    private categoriaService: CategoriasService,
    private dialog: MatDialog
  ) { }
  openModalRegistroSubcategorias() {
    this.categoriaService.getCategoriaSeleccionada().subscribe(idCategoria => {
      if (idCategoria) {
        this.dialog.open(CrearComponent, {
          data: { idCategoria }
        });
      } else {
        this.openSnackBar('No hay categoría seleccionada.', 'Cerrar');
        console.warn('⚠️ No hay categoría seleccionada.');
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
