import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from '../validations/form-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerError: string = '';
  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, matchValidator('confirmPassword', true)],
    ],
    confirmPassword: ['', [Validators.required, matchValidator('password')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router
  ) {}

  get username() {
    return this.registerForm.controls.username;
  }
  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  register() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes campos erroneos!',
      });
      return;
    }

    const user = {
      username: this.username.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
    };

    this.registerError = '';
    this.userService.register(user).subscribe({
      error: (errorData) => {
        console.error(errorData);
        this.registerError = errorData;
      },
      complete: () => {
        console.info('Registro completo');
        Swal.fire({ icon: 'success', title: 'Usuario creado!' });
        this.router.navigateByUrl('/login');
        this.registerForm.reset();
      },
    });
  }
}
