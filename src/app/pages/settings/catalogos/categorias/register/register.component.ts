import {Component, OnInit} from '@angular/core';
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
import { FormulariosService } from '../../../../../shared/services/formularios.service';
import { CommonModule } from '@angular/common';

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
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent implements OnInit {
  public categoriaForm: FormGroup;
  formularioCampos: any[] = [];

  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<RegisterComponent>,
    private catalogosService: CatalogosService,
    private formulariosService: FormulariosService
  ) {
    this.categoriaForm = this.fb.group({});
  }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulariosService.getFormularioCategoria().subscribe({
      next: (response) => {
        this.formularioCampos = response.campos;
        this.crearFormularioDinamico();
      },
      error: (error) => {
        console.error('Error al cargar el formulario:', error);
      }
    });
  }

  crearFormularioDinamico() {
    const group: any = {};
    this.formularioCampos.forEach(campo => {
      const validadores = [];
      if (campo.requerido) {
        validadores.push(Validators.required);
      }
      if (campo.type === 'string') {
        validadores.push(Validators.minLength(3));
      }
      group[campo.name] = ['', validadores];
    });
    this.categoriaForm = this.fb.group(group);
  }

  public saveCategoria() {    
    if (this.categoriaForm.valid) {
      const formData = this.categoriaForm.value;
      this.catalogosService.registrarCategoria(formData.nombre).subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
