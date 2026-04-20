// ============================================================
// ARCHIVO DE PRUEBAS UNITARIAS: productos.component.spec.ts
// ============================================================
// Este archivo prueba el componente ProductosComponent
// (pantalla que muestra el menú de productos con categorías)

// Importación de utilidades necesarias para pruebas en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente ProductosComponent desde su archivo
// Nota: El archivo './productos' exporta el componente (probablemente como ProductosComponent)
import { ProductosComponent } from './productos';

// ============================================================
// BLOQUE PRINCIPAL DE PRUEBAS
// ============================================================
// describe: Agrupa todas las pruebas relacionadas con ProductosComponent
// El nombre 'Productos' identifica el conjunto de pruebas
describe('Productos', () => {
  
  // ============================================================
  // DECLARACIÓN DE VARIABLES
  // ============================================================
  // component: Instancia del componente a probar
  let component: ProductosComponent;
  
  // fixture: Envuelve al componente y su template, permite acceso al DOM
  let fixture: ComponentFixture<ProductosComponent>;

  // ============================================================
  // CONFIGURACIÓN INICIAL (se ejecuta ANTES de cada prueba)
  // ============================================================
  // async: Permite usar await para operaciones asíncronas
  beforeEach(async () => {
    
    // TestBed.configureTestingModule: Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [ProductosComponent],  // ⚠️ Declaración (no imports) - Componente NO standalone
    }).compileComponents();                // Compila los componentes y sus templates

    // ============================================================
    // CREACIÓN DEL COMPONENTE
    // ============================================================
    // Crea una instancia del componente envuelta en un fixture
    fixture = TestBed.createComponent(ProductosComponent);
    
    // Obtiene la instancia del componente desde el fixture
    component = fixture.componentInstance;
    
    // ============================================================
    // ESPERA A TAREAS ASÍNCRONAS
    // ============================================================
    // whenStable: Espera a que todas las tareas asíncronas terminen
    // (promesas, observables, etc.) antes de continuar con las pruebas
    await fixture.whenStable();
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
  // ============================================================
  // Se podrían agregar más pruebas como:
  // - Verificar que las categorías se cargan correctamente
  // - Probar que cambiarCategoria() filtra los productos
  // - Verificar que agregar() añade productos al carrito
  // - Comprobar que productosFiltrados() devuelve los productos correctos
  // ============================================================
});