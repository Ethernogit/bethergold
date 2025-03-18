import {Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CatalogosService } from '../../../../../../shared/services/catalogos.service';
@Component({
  selector: 'app-crear',
  imports: [
    MatInputModule,
    FormsModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogContent, 
    MatDialogTitle,
    ReactiveFormsModule
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {
  idCategoria!: string;
  public subcategoriaForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CrearComponent>,
    private catalogosService: CatalogosService,
    @Inject(MAT_DIALOG_DATA) public data: { idCategoria: string }
  ) {
    this.subcategoriaForm = this.fb.group({
      categoriaId: data.idCategoria,
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  ngOnInit() {
    this.idCategoria = this.data.idCategoria;
    console.log('Creando subcategoría para la categoría con ID:', this.idCategoria);
  }

  saveSubcategoria() {
    if (this.subcategoriaForm.valid) {
      this.catalogosService.registrarSubcategoria(this.subcategoriaForm.value.categoriaId, this.subcategoriaForm.value.nombre).subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
    console.log(this.subcategoriaForm.value);
  }
}
