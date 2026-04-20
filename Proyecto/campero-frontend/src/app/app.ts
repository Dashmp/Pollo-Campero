import { Component, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet, Event } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('campero-frontend');
  public loadingService = inject(LoadingService);
  private router = inject(Router);

  constructor() {
    // Escuchamos los eventos de cambio de pantalla de Angular
    this.router.events.subscribe((event: Event) => {

      // Si empieza a navegar hacia otra pantalla
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      // Si la navegación termina (ya sea con éxito, cancelada o con error)
      else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Le damos un pequeño retraso de medio segundo para que la animación se vea fluida
        setTimeout(() => {
          this.loadingService.hide();
        }, 500);
      }
    });
  }
}