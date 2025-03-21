import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreatesucursalComponent } from './createsucursal/createsucursal.component';
@Component({
  selector: 'app-sucursales',
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent {
  constructor(
    private dialog: MatDialog
  ) { }
  openModalRegistroSucursal():void{
    const dialogRef = this.dialog.open(CreatesucursalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // this.listadoComponent.recargarListado();
      }
    });
  }
}
