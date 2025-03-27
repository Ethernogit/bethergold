import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsModule } from '../shared/modules/utils.module';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [UtilsModule]
})
export class LoginComponent {
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.userForm.valid) {
      this.errorMessage = '';
      this.authService.loginUser(this.userForm.value.email, this.userForm.value.password).subscribe({
        next: (response) => {
          if (response.token) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Error en la respuesta del servidor';
            this.authService.logout();
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
          this.authService.logout();
        }
      });
    }
  }
}