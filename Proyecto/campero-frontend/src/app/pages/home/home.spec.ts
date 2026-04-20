// ============================================================
// ARCHIVO DE PRUEBAS UNITARIAS: home.component.spec.ts
// ============================================================
// Este archivo prueba el componente HomeComponent
// (página principal que contiene carrusel y sección hero)

// Importación de utilidades necesarias para pruebas en Angular
// - ComponentFixture: Envuelve el componente y permite acceso al DOM
// - TestBed: Configura el entorno de pruebas de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente HomeComponent desde su archivo
// El archivo './home' exporta el componente HomeComponent
import { HomeComponent } from './home';

// ============================================================
// BLOQUE PRINCIPAL DE PRUEBAS
// ============================================================
// describe: Agrupa todas las pruebas relacionadas con el componente Home
// El nombre 'Home' identifica este conjunto de pruebas
describe('Home', () => {
  
  // ============================================================
  // DECLARACIÓN DE VARIABLES
  // ============================================================
  // component: Instancia del componente HomeComponent a probar
  let component: HomeComponent;
  
  // fixture: Envuelve al componente y su template
  // Permite acceder al DOM y forzar la detección de cambios
  let fixture: ComponentFixture<HomeComponent>;

  // ============================================================
  // CONFIGURACIÓN INICIAL (se ejecuta ANTES de cada prueba)
  // ============================================================
  // async: Permite usar await para operaciones asíncronas
  beforeEach(async () => {
    
    // TestBed.configureTestingModule: Configura el módulo de pruebas
    // imports: [HomeComponent] - El componente se importa directamente
    // Esto indica que HomeComponent es un componente STANDALONE
    await TestBed.configureTestingModule({
      imports: [HomeComponent],    // Importa el componente (no declaración)
    }).compileComponents();        // Compila el componente y su template

    // ============================================================
    // CREACIÓN DEL COMPONENTE
    // ============================================================
    // Crea una instancia del componente envuelta en un fixture
    fixture = TestBed.createComponent(HomeComponent);
    
    // Obtiene la instancia del componente desde el fixture
    component = fixture.componentInstance;
    
    // ============================================================
    // ESPERA A TAREAS ASÍNCRONAS
    // ============================================================
    // whenStable: Espera a que todas las tareas asíncronas terminen
    // Útil si el componente tiene inicialización asíncrona
    // (ej: llamadas HTTP, promesas, observables, setTimeout, etc.)
    await fixture.whenStable();
    
    // NOTA: No se llama a fixture.detectChanges() aquí
    // Esto significa que la detección de cambios inicial NO se ejecuta
    // El template podría no estar actualizado con los valores del componente
  });

  // ============================================================
  // PRUEBA INDIVIDUAL #1
  // ============================================================
  // it('should create'): Prueba básica que verifica la creación del componente
  // Esta es la prueba mínima requerida para cualquier componente Angular
  it('should create', () => {
    // expect(component).toBeTruthy(): Comprueba que el componente existe
    // y no es null, undefined, false, 0, NaN o cadena vacía
    // Si el componente se instancia correctamente, la prueba pasa
    expect(component).toBeTruthy();
  });
  
  // ============================================================
  // NOTA: Solo hay una prueba básica
  // ============================================================
  // Para un componente más completo como HomeComponent,
  // se podrían agregar pruebas adicionales como:
  // 
  // - Verificar que el carrusel se inicializa correctamente
  // - Probar que el método irAlMenu() navega a la ruta correcta
  // - Comprobar que las imágenes del carrusel se cargan
  // - Verificar que los botones existen y son funcionales
  // - Probar que el título y descripción se renderizan correctamente
  // - Verificar el comportamiento responsive
  // ============================================================
});