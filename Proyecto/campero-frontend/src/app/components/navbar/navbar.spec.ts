// ============================================================
// ARCHIVO DE PRUEBAS UNITARIAS: navbar.component.spec.ts
// ============================================================
// Este archivo prueba el componente NavbarComponent
// (barra de navegación principal de la aplicación)

// Importación de utilidades necesarias para pruebas en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente NavbarComponent desde su archivo
// El comentario indica que originalmente se importaba como 'Navbar' 
// y se ha cambiado a 'NavbarComponent' para seguir convenciones
import { NavbarComponent } from './navbar'; // Cambiado de Navbar a NavbarComponent

// ============================================================
// BLOQUE PRINCIPAL DE PRUEBAS
// ============================================================
// describe: Agrupa todas las pruebas relacionadas con NavbarComponent
// El nombre 'NavbarComponent' ha sido cambiado (seguía convención de nombres)
describe('NavbarComponent', () => { // Cambiado
  
  // ============================================================
  // DECLARACIÓN DE VARIABLES
  // ============================================================
  // component: Instancia del componente a probar
  let component: NavbarComponent; // Cambiado (antes: Navbar)
  
  // fixture: Envuelve al componente y su template, permite acceso al DOM
  let fixture: ComponentFixture<NavbarComponent>; // Cambiado (antes: Navbar)

  // ============================================================
  // CONFIGURACIÓN INICIAL (se ejecuta ANTES de cada prueba)
  // ============================================================
  // async: Permite usar await para operaciones asíncronas
  beforeEach(async () => {
    
    // TestBed.configureTestingModule: Configura el entorno de pruebas
    await TestBed.configureTestingModule({
      imports: [NavbarComponent] // Cambiado: Importa el componente como standalone
    })
    .compileComponents(); // Compila los componentes y sus templates

    // ============================================================
    // CREACIÓN DEL COMPONENTE
    // ============================================================
    // Crea una instancia del componente envuelta en un fixture
    fixture = TestBed.createComponent(NavbarComponent); // Cambiado (antes: Navbar)
    
    // Obtiene la instancia del componente desde el fixture
    component = fixture.componentInstance;
    
    // ============================================================
    // DETECCIÓN DE CAMBIOS INICIAL
    // ============================================================
    // detectChanges(): Ejecuta la detección de cambios de Angular
    // Actualiza el template con los valores iniciales del componente
    // Es necesario para que el DOM refleje el estado del componente
    fixture.detectChanges();
  });

  // ============================================================
  // PRUEBA INDIVIDUAL #1
  // ============================================================
  // it('should create'): Verifica que el componente se crea correctamente
  // Esta es la prueba mínima requerida para cualquier componente
  it('should create', () => {
    // expect(component).toBeTruthy(): Comprueba que el componente existe
    // y no es null, undefined, false, 0 o cadena vacía
    expect(component).toBeTruthy();
  });
  
  // ============================================================
  // NOTA: Solo hay una prueba básica
  // Se podrían agregar más pruebas como:
  // - Verificar que el logo se renderiza correctamente
  // - Comprobar que los enlaces de navegación existen
  // - Probar que el contador del carrito se actualiza
  // - Verificar que el botón del carrito navega a la ruta correcta
  // ============================================================
});