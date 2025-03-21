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
  selector: 'app-createsucursal',
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
  templateUrl: './createsucursal.component.html',
  styleUrl: './createsucursal.component.css'
})
export class CreatesucursalComponent {
  public sucursalForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreatesucursalComponent>,
    private catalogosService: CatalogosService
  ) {
    this.sucursalForm = this.fb.group({
      sucursal: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  saveSucursal(){}
}
