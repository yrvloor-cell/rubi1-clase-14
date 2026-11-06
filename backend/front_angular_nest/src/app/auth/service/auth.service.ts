import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.urlServidor;
  private readonly http = inject(HttpClient);

  loginConNest(credenciales: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, credenciales);
  }

  registroConNest(datos: unknown) {
    return this.http.post(`${this.baseUrl}/auth/register`, datos);
  }
}
