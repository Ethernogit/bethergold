import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogosService } from '../../../../shared/services/catalogos.service';
import { Usuarios } from '../../../../interfaces/Usuarios';
@Component({
  selector: 'app-usuarios',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  subcategorias: any[] = [];
  categoriaSubscription!: Subscription;
  displayedColumns: string[] = ['name','email','status', 'id'];
  dataSource: MatTableDataSource<Usuarios>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private catalogosService: CatalogosService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    this.cargarUsuarios();
  }
  private cargarUsuarios(): void {
    this.catalogosService.getUsuarios().subscribe(data => {
      this.dataSource.data = data;
  
      // 🔄 Reasignar el paginador y el sort después de actualizar los datos
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
