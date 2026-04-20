import { Component, inject, ChangeDetectorRef } from '@angular/core'; // <-- AÑADIDO ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // <-- AÑADIDO

  user = { username: '', email: '', password: '' };
  
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister(event: Event, form: NgForm) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Por favor, cumple con todos los requisitos del formulario.';
      return;
    }
    
    this.authService.registro(this.user).subscribe({
      next: () => {
        this.successMessage = `¡Bienvenido a la familia, ${this.user.username}! Redirigiendo al login...`;
        this.cdr.detectChanges(); // <-- AÑADIDO
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'El correo electrónico o nombre de usuario ya se encuentran registrados.';
        this.cdr.detectChanges(); // <-- AÑADIDO
      }
    });
  }
}