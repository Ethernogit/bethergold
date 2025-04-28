import { Component } from '@angular/core';
import { FormulariosService } from '../../../../shared/services/formularios.service';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EditFormDialogComponent } from '../edit-form-dialog/edit-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-productos-form',
  imports: [
    MatTableModule,
    MatIcon,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css',
  standalone: true
})
export class ProductosFormComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = ['Name','Required','Type','Options','Actions'];
  constructor(private formulariosService: FormulariosService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.formulariosService.getformproducto().subscribe(data => {
      this.dataSource = data.campos;
    });
  }
  editRow(row: any) {
    const dialogRef = this.dialog.open(EditFormDialogComponent, {
      data: { campo: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.formulariosService.updateformproducto(result).subscribe(data => {
          this.dataSource = data.campos;
        });
      }
    });
  }
  deleteRow(row: any) {
    console.log(row);
  }
}