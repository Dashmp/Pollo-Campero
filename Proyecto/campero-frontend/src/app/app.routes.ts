import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductosComponent } from './components/productos/productos';
import { CarritoComponent } from './components/carrito/carrito';
import { LoginComponent } from './components/login/login'; 
import { RegistroComponent } from './components/registro/registro';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'productos', component: ProductosComponent }, 
  { path: 'carrito', component: CarritoComponent }, 
  { path: 'registro', component: RegistroComponent }, 
  { path: 'login', component: LoginComponent }, 

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];