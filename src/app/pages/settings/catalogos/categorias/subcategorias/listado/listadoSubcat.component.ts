import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CategoriasService } from '../../categorias.service';
import { Subscription } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subcategoria } from '../../../../../../interfaces/subcategoria';
import { CatalogosService } from '../../../../../../shared/services/catalogos.service';
@Component({
  selector: 'app-listadoSubcat',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './listadoSubcat.component.html',
  styleUrl: './listadoSubcat.component.css'
})
export class ListadoSubcatComponent implements OnInit, OnDestroy {
  private _snackBar = inject(MatSnackBar);

  subcategorias: any[] = [];
  categoriaSubscription!: Subscription;
  displayedColumns: string[] = ['nombre', 'id'];
  dataSource: MatTableDataSource<Subcategoria>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private categoriaService: CategoriasService,
    private catalogosService: CatalogosService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnDestroy(): void {
    this.categoriaSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.categoriaSubscription = this.categoriaService
      .getCategoriaSeleccionada()
      .subscribe(idCategoria => {
        if (idCategoria) {
          this.cargarSubcategorias(idCategoria);
        }
      });
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

  cargarSubcategorias(idCategoria: string) {
    this.catalogosService.getSubcategorias(idCategoria).subscribe(data => {
      this.dataSource.data = data;
  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  eliminarSubcategoria(id: string) {
    this.catalogosService.eliminarSubcategoria(id).subscribe(() => {
      this.openSnackBar('Subcategoría eliminada.', 'Cerrar');
      this.categoriaService.getCategoriaSeleccionada().subscribe(idCategoria => {
        if (idCategoria) {
          this.cargarSubcategorias(idCategoria);
        }
      });
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
