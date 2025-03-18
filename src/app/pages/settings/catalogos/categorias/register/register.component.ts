import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatalogosService} from '../../../../../shared/services/catalogos.service';
@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public categoriaForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<RegisterComponent>,
    private catalogosService: CatalogosService
  ) {
    this.categoriaForm = this.fb.group({
      categoria: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  public saveCategoria() {    
    if (this.categoriaForm.valid) {
      console.log(this.categoriaForm.value);
      
      this.catalogosService.registrarCategoria(this.categoriaForm.value.categoria).subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
