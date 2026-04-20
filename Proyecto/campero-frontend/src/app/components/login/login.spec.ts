import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Necesario si el componente usa routerLink

// 1. Asegúrate de que el nombre de la clase sea LoginComponent 
// y que la ruta './login' sea la correcta respecto a este archivo.
import { LoginComponent } from './login'; 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Importamos LoginComponent (asumiendo que es Standalone)
      imports: [LoginComponent],
      // 3. Proporcionamos el Router por si el HTML del login tiene enlaces
      providers: [provideRouter([])] 
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    // Detectar cambios iniciales
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});