// footer.spec.ts
// Archivo de pruebas unitarias para el componente FooterComponent

// Importación de utilidades necesarias para las pruebas de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente FooterComponent desde su ruta relativa
// El comentario indica que originalmente se importaba como 'Footer' y se sugiere cambiarlo a 'FooterComponent'
import { FooterComponent } from './footer';  // ← cambia Footer por FooterComponent

// Bloque describe: agrupa todas las pruebas relacionadas con FooterComponent
describe('FooterComponent', () => {
  
  // Declaración de variables disponibles para todas las pruebas dentro del bloque
  let component: FooterComponent;      // Instancia del componente a probar
  let fixture: ComponentFixture<FooterComponent>;  // Fixture que envuelve al componente y su template

  // beforeEach: Función que se ejecuta antes de cada prueba individual
  // async: Permite usar await dentro de la función (para operaciones asíncronas)
  beforeEach(async () => {
    
    // TestBed.configureTestingModule: Configura el módulo de pruebas para Angular
    // imports: [FooterComponent] - Se importa el componente directamente (es standalone)
    await TestBed.configureTestingModule({
      imports: [FooterComponent],    // El componente se importa como módulo standalone
    }).compileComponents();          // Compila los componentes y templates (necesario para pruebas)

    // TestBed.createComponent: Crea una instancia del componente envuelta en un fixture
    fixture = TestBed.createComponent(FooterComponent);
    
    // Accede a la instancia del componente desde el fixture
    component = fixture.componentInstance;
    
    // whenStable: Espera a que todas las tareas asíncronas (promesas, observables) se completen
    // Útil si el componente tiene lógica asíncrona en su inicialización (ngOnInit, constructores, etc.)
    await fixture.whenStable();
  });

  // Prueba individual: verifica que el componente se haya creado correctamente
  it('should create', () => {
    // expect(component).toBeTruthy() - Comprueba que el componente existe y no es null/undefined
    expect(component).toBeTruthy();
  });
});