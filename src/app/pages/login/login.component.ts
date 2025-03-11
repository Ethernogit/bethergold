import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilsModule } from '../../shared/modules/utils.module';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ UtilsModule]
})
export class LoginComponent {
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  submit() {
    console.log("no validado")
    if (this.userForm.valid) {
      console.log("valido");
      
      this.authService.loginUser(this.userForm.value.email, this.userForm.value.password).subscribe({
        next: (response) => {
         console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}