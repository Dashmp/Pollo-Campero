// ============================================================
// COMPONENTE: HOME (PÁGINA PRINCIPAL)
// ============================================================
// Este componente representa la página de inicio de la aplicación
// Contiene un carrusel de Bootstrap y una sección hero con mensajes de marca

// Importación de decoradores y utilidades de Angular
// - Component: Decorador que define un componente Angular
// - inject: Función moderna para inyección de dependencias (sin constructor)
// - AfterViewInit: Ciclo de vida que se ejecuta después de que la vista está lista
// - PLATFORM_ID: Token que identifica la plataforma actual (navegador o servidor)
import { Component, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';

// Importación de utilidad para detectar si el código se ejecuta en navegador
// isPlatformBrowser: Función que retorna true si está en navegador, false si está en servidor (SSR)
import { isPlatformBrowser } from '@angular/common';

// Importación del enrutador de Angular para navegación
import { Router } from '@angular/router';

// ============================================================
// DECLARACIÓN DE VARIABLE GLOBAL
// ============================================================
// declare var bootstrap: any;
// Declara que existe una variable global 'bootstrap' (del CDN de Bootstrap JS)
// 'any' significa que no se conoce su tipo exacto
// Esta variable es proporcionada por Bootstrap JS y permite controlar componentes dinámicamente
declare var bootstrap: any;

// ============================================================
// DECORADOR @Component
// ============================================================
@Component({
  selector: 'app-home',           // Nombre del selector HTML para usar este componente
  standalone: true,               // Componente independiente (no necesita NgModule)
  templateUrl: './home.html',     // Ruta del archivo HTML asociado
  styleUrls: ['./home.css']       // Ruta del archivo de estilos CSS asociado
})

// ============================================================
// CLASE PRINCIPAL DEL COMPONENTE
// ============================================================
// Implementa AfterViewInit para ejecutar lógica después de que la vista está renderizada
export class HomeComponent implements AfterViewInit {

  // ============================================================
  // INYECCIÓN DE DEPENDENCIAS (Forma moderna con inject)
  // ============================================================
  
  // Inyección del enrutador de Angular
  // Permite navegar programáticamente entre páginas
  private router = inject(Router);
  
  // Inyección del token PLATFORM_ID
  // Permite detectar si el código se ejecuta en navegador o en servidor (SSR)
  // Esencial para evitar errores con código específico del navegador
  private platformId = inject(PLATFORM_ID);

  // ============================================================
  // CICLO DE VIDA: ngAfterViewInit
  // ============================================================
  // Se ejecuta AUTOMÁTICAMENTE después de que Angular ha inicializado la vista del componente
  // Es el lugar ideal para manipular el DOM o inicializar componentes de terceros (como Bootstrap)
  ngAfterViewInit(): void {

    // 🔥 SOLO se ejecuta en navegador (NO en SSR)
    // ============================================================
    // VERIFICACIÓN DE PLATAFORMA
    // ============================================================
    // isPlatformBrowser: Verifica si el código se ejecuta en el navegador
    // Previene errores en Server-Side Rendering (SSR) porque:
    // - 'document' no existe en el servidor
    // - 'bootstrap' no está disponible en el servidor
    // Sin esta verificación, la aplicación fallaría al renderizar en servidor
    if (isPlatformBrowser(this.platformId)) {

      // ============================================================
      // INICIALIZACIÓN MANUAL DEL CARRUSEL
      // ============================================================
      // Selecciona el elemento del DOM con id 'camperoCarousel'
      // Este es el contenedor del carrusel en home.html
      const element = document.querySelector('#camperoCarousel');

      // Verifica que el elemento exista en el DOM
      if (element) {
        
        // ============================================================
        // CONFIGURACIÓN DEL CARRUSEL DE BOOTSTRAP
        // ============================================================
        // Crea una nueva instancia del carrusel de Bootstrap
        // bootstrap.Carousel: Constructor proporcionado por Bootstrap JS
        // Parámetros:
        //   element: El elemento DOM que se convertirá en carrusel
        //   options: Objeto de configuración del carrusel
        new bootstrap.Carousel(element, {
          
          // interval: Tiempo entre transiciones automáticas (en milisegundos)
          // 2500ms = 2.5 segundos entre cada cambio de imagen
          interval: 2500,
          
          // ride: Inicia el carrusel automáticamente
          // 'carousel' indica que comienza a rotar inmediatamente
          ride: 'carousel',
          
          // pause: Detiene el carrusel al hacer hover
          // false = NO pausa cuando el mouse está sobre el carrusel
          pause: false,
          
          // wrap: Permite ciclo infinito
          // true = después de la última imagen vuelve a la primera
          wrap: true,
          
          // touch: Habilita control táctil
          // true = permite deslizar en dispositivos táctiles (móviles/tablets)
          touch: true
        });
      }
    }
  }

  // ============================================================
  // MÉTODO: irAlMenu
  // ============================================================
  // Propósito: Navegar a la página de productos/menú
  // Uso: Vinculado al botón "VER EL MENÚ" en home.html
  //       (click)="irAlMenu()"
  irAlMenu(): void {
    // router.navigate(): Método de Angular para navegar programáticamente
    // ['/productos']: Array con la ruta de navegación
    // Navega a la URL '/productos' donde se muestra el catálogo de productos
    this.router.navigate(['/productos']);
  }
}