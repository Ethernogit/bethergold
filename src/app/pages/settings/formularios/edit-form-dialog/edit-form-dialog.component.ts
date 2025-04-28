import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-form-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.css',
  standalone: true
})
export class EditFormDialogComponent {
  public campoForm: FormGroup;
  public opciones: string[] = [];
  public nuevaOpcion: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { campo: any }
  ) {    
    // Inicializar opciones si existen
    if (data.campo.opciones && Array.isArray(data.campo.opciones)) {
      this.opciones = [...data.campo.opciones];
    } else if (data.campo.opciones) {
      // Si es un string, intentar convertirlo a array
      try {
        this.opciones = JSON.parse(data.campo.opciones);
      } catch (e) {
        this.opciones = [data.campo.opciones];
      }
    }
    
    this.campoForm = this.fb.group({
      _id: [data.campo._id, Validators.required],
      name: [data.campo.name, Validators.required],
      type: [data.campo.type, Validators.required],
      requerido: [data.campo.requerido, Validators.required],
      opciones: [data.campo.opciones, Validators.required]
    });
  }

  agregarOpcion() {
    if (this.nuevaOpcion && this.nuevaOpcion.trim() !== '') {
      this.opciones.push(this.nuevaOpcion.trim());
      this.nuevaOpcion = '';
    }
  }

  eliminarOpcion(opcion: string) {
    const index = this.opciones.indexOf(opcion);
    if (index > -1) {
      this.opciones.splice(index, 1);
    }
  }

  save() {
    const formValue = this.campoForm.value;
    formValue.opciones = this.opciones;
    this.dialogRef.close(formValue);
  }

  cancel() {
    this.dialogRef.close();
  }
}
