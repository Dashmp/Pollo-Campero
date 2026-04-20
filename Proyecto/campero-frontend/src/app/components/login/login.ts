import { Component, inject, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); 

  credentials = { email: '', password: '' };
  
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin(event: Event, form: NgForm) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Por favor, revisa que los datos ingresados sean correctos.';
      return;
    }

    const payload = {
      username: this.credentials.email,
      password: this.credentials.password
    };

    this.authService.login(payload).subscribe({
      next: () => {
        this.authService.getPerfil().subscribe({
          next: (perfil) => {
            // CAMBIO: Guardamos el nombre en sessionStorage
            sessionStorage.setItem('username', perfil.username);
            
            this.successMessage = `¡Bienvenido de vuelta, ${perfil.username}!`;
            this.cdr.detectChanges(); 
            
            setTimeout(() => {
              this.router.navigate(['/productos']); 
            }, 1500);
          },
          // ... resto del código sin cambios ...
          error: () => {
            // Si falla la petición extra, iniciamos sesión igual con el correo
            const nombreFallback = this.credentials.email.split('@')[0];
            this.successMessage = `¡Bienvenido de vuelta, ${nombreFallback}!`;
            this.cdr.detectChanges();
            setTimeout(() => this.router.navigate(['/productos']), 1500);
          }
        });
      },
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos. Intenta de nuevo.';
        this.cdr.detectChanges(); 
      }
    });
  }
}