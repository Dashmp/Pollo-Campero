import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private url = 'http://localhost:8000/api/';

  login(credentials: any) {
    return this.http.post<any>(`${this.url}login/`, credentials).pipe(
      tap(res => {
        if (isPlatformBrowser(this.platformId)) {
          // Usamos sessionStorage para seguridad de sesión corta
          sessionStorage.setItem('token', res.access);
        }
      })
    );
  }

  getPerfil() {
    return this.http.get<any>(`${this.url}perfil/`);
  }

  getToken() {
    return isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
  }

  getUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      const storedName = sessionStorage.getItem('username'); // CAMBIO
      if (storedName) return storedName;

      const token = this.getToken();
      if (!token) return 'Invitado';

      try {
        const decoded: any = jwtDecode(token);
        return decoded.username || decoded.email?.split('@')[0] || 'Campero';
      } catch {
        return 'Campero';
      }
    }
    return 'Campero';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      // .clear() elimina Token, Nombre de Usuario Y el Carrito al salir
      sessionStorage.clear(); 
      window.location.href = '/login';
    }
  }

  isLoggedIn(): boolean { return !!this.getToken(); }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.is_staff === true || decoded.user_id === 1;
    } catch { return false; }
  }

  registro(userData: any) {
    return this.http.post(`${this.url}registro/`, userData);
  }
}

