import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { LayoutService } from '../../../admin/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly layoutService = inject(LayoutService);

  enviando = false;
  mensajeError = '';

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(25)]
    })
  });

  funIngresar(): void {
    this.mensajeError = '';
    if (this.loginForm.invalid || this.enviando) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.authService.loginConNest(this.loginForm.getRawValue()).subscribe({
      next: (respuesta) => {
        this.enviando = false;
        if (respuesta?.token) {
          localStorage.setItem('token', respuesta.token);
          this.router.navigate(['/admin']);
        } else {
          this.mensajeError = 'El servidor respondió, pero no envió un token.';
        }
      },
      error: (error) => {
        this.enviando = false;
        this.mensajeError = error?.error?.message || 'No se pudo iniciar sesión. Verifica que el backend esté iniciado.';
        console.error('Error de inicio de sesión:', error);
      }
    });
  }
}
