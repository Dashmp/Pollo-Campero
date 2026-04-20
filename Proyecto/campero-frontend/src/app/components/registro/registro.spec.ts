// ============================================================
// ARCHIVO DE PRUEBAS UNITARIAS: menu.component.spec.ts
// ============================================================
// Este archivo prueba el componente MenuComponent
// (componente que muestra el menú de productos con categorías filtrables)

// Importación de utilidades necesarias para pruebas en Angular
// - ComponentFixture: Envuelve el componente y permite acceso al DOM
// - TestBed: Configura el entorno de pruebas de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registro } from './registro';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  // ============================================================
  // CONFIGURACIÓN INICIAL (se ejecuta ANTES de cada prueba)
  // ============================================================
  // async: Permite usar await para operaciones asíncronas
  beforeEach(async () => {
    
    // TestBed.configureTestingModule: Configura el módulo de pruebas
    // imports: [MenuComponent] - El componente se importa directamente
    // Esto indica que MenuComponent es un componente STANDALONE
    await TestBed.configureTestingModule({
      imports: [Registro],
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    
    // ============================================================
    // ESPERA A TAREAS ASÍNCRONAS
    // ============================================================
    // whenStable: Espera a que todas las tareas asíncronas terminen
    // Útil si el componente tiene inicialización asíncrona
    // (ej: llamadas HTTP, promesas, observables, setTimeout, etc.)
    await fixture.whenStable();
    
    // ============================================================
    // NOTA SOBRE DETECCIÓN DE CAMBIOS
    // ============================================================
    // No se llama a fixture.detectChanges() aquí
    // Esto significa que la detección de cambios inicial NO se ejecuta
    // El template podría no estar actualizado con los valores del componente
    // Para la prueba básica 'should create' esto no es un problema
    // ============================================================
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
  // Para un componente más completo como MenuComponent,
  // se podrían agregar pruebas adicionales como:
  // 
  // - Verificar que las categorías se cargan correctamente
  // - Probar que el método filtrar() actualiza categoriaActual
  // - Comprobar que los productos filtrados coinciden con la categoría seleccionada
  // - Verificar que el scroll horizontal funciona
  // - Probar que las imágenes de categorías se renderizan
  // - Verificar que el estado 'selected' se aplica correctamente
  // - Probar la interacción con el servicio de carrito
  // ============================================================
});