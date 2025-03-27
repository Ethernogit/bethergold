import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../../../../../shared/services/catalogos.service';

@Component({
    selector: 'app-register',
    standalone: true,
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
    public roleForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<RegisterComponent>,
        private catalogosService: CatalogosService
    ) {
        this.roleForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            slug: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    public saveRole() {
        if (this.roleForm.valid) {
            this.catalogosService.registrarRol(this.roleForm.value).subscribe({
                next: (res) => {
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.error('Error al registrar el rol:', err);
                }
            });
        }
    }
} 