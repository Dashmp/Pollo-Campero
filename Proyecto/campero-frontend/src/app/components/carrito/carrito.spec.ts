// Importación de utilidades necesarias para realizar pruebas unitarias en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente que se va a probar
// Nota: El comentario indica que originalmente se importaba como 'Carrito' y se sugiere cambiarlo a 'CarritoComponent'
import { CarritoComponent } from './carrito'; // <-- Cambia 'Carrito' por 'CarritoComponent'

// Bloque principal de pruebas para el componente CarritoComponent
describe('CarritoComponent', () => {
  
  // Declaración de variables que se usarán en cada prueba
  let component: CarritoComponent;      // Instancia del componente a probar
  let fixture: ComponentFixture<CarritoComponent>;  // Fixture que envuelve al componente y su template

  // Función que se ejecuta antes de cada prueba (asíncrona)
  beforeEach(async () => {
    
    // Configuración del módulo de pruebas para el componente
    await TestBed.configureTestingModule({
      imports: [CarritoComponent]  // Se importa el componente (es standalone)
    })
    .compileComponents();  // Compila los componentes y templates

    // Creación del fixture y del componente
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    
    // Detecta cambios iniciales para actualizar el template
    fixture.detectChanges();
  });

  // Prueba individual: verifica que el componente se haya creado correctamente
  it('should create', () => {
    // Expectativa: el componente debe existir y ser verdadero (no nulo ni indefinido)
    expect(component).toBeTruthy();
  });
});