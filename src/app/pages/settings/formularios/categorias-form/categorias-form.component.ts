import { Component } from '@angular/core';
import { FormulariosService } from '../../../../shared/services/formularios.service';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EditFormDialogComponent } from '../edit-form-dialog/edit-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-categorias-form',
  imports: [
    MatTableModule,
    MatIcon,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './categorias-form.component.html',
  styleUrl: './categorias-form.component.css',
  standalone: true
})
export class CategoriasFormComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = ['Name','Required','Type','Options','Actions'];
  constructor(private formulariosService: FormulariosService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.formulariosService.getFormularioCategoria().subscribe(data => {
      this.dataSource = data.campos;
    });
  }
  editRow(row: any) {
    const dialogRef = this.dialog.open(EditFormDialogComponent, {
      data: { campo: row }
    });
  }
  deleteRow(row: any) {
    this.formulariosService.deleteCampoCategoria(row._id).subscribe(data => {
      this.dataSource = data.campos;
    });
  }
}
