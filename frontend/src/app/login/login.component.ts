import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      // alert('Error al ingresar los datos.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos.!',
      });
      return;
    }

    this.loginError = '';
    const user = {
      email: this.email.value,
      password: this.password.value,
    };
    this.userService.login(user).subscribe({
      next: (token) => {
        this.userService.setToken(token);
      },
      error: (errorData) => {
        console.error(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        console.info('Login completo');
        this.router.navigateByUrl('/player');
        this.loginForm.reset();
      },
    });
  }
}
