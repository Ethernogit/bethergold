import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Categoria } from '../../../../../interfaces/categoria';
import { CatalogosService } from '../../../../../shared/services/catalogos.service';
import {MatButtonModule} from '@angular/material/button';
import { CategoriasService } from '../categorias.service';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-listado',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatProgressSpinnerModule,MatButtonModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['nombre', 'id'];
  dataSource: MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private catalogoService: CatalogosService,
    private categoriasService: CategoriasService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    this.cargarCategorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  recargarListado(): void {
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.catalogoService.getCategorias().subscribe(data => {
      this.dataSource.data = data;
  
      // 🔄 Reasignar el paginador y el sort después de actualizar los datos
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  seleccionarCategoria(idCategoria: string) {
    this.categoriasService.setCategoriaSeleccionada(idCategoria);
  }
  eliminarCategoria(idCategoria: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '350px',
        data: { 
          titulo:"Eliminar categoría",
          mensaje: "¿Estás seguro de eliminar esta categoría?"}
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.catalogoService.eliminarCategoria(idCategoria).subscribe(() => {
          this.openSnackBar('Categoría eliminada.', 'Cerrar');
          this.cargarCategorias();
        });
      } else {
        // El usuario canceló
        console.log('Usuario canceló');
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
