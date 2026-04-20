import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private url = 'http://localhost:8000/api/';

    // --- ESTADO REACTIVO DEL CARRITO ---
    private cartCountSource = new BehaviorSubject<number>(this.getInitialCartCount());
    public cartCount$ = this.cartCountSource.asObservable(); // La Navbar "escuchará" esta variable

    private getInitialCartCount(): number {
        if (isPlatformBrowser(this.platformId)) {
            // CAMBIO: Ahora lee de sessionStorage
            const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');
            return carrito.reduce((total: number, item: any) => total + item.cantidad, 0);
        }
        return 0;
    }
    // Llama a esto cada vez que modifiques el localStorage del carrito
    actualizarContadorCarrito() {
        this.cartCountSource.next(this.getInitialCartCount());
    }

    // --- TUS PETICIONES EXISTENTES (Se mantienen igual) ---
    getCategorias() { return this.http.get<any[]>(`${this.url}categorias/`); }
    getProductos() { return this.http.get<any[]>(`${this.url}productos/`); }
    eliminarProducto(id: number) { return this.http.delete(`${this.url}productos/${id}/`); }

    crearProducto(producto: any) { return this.http.post(`${this.url}productos/`, producto); }
    editarProducto(id: number, producto: any) { return this.http.put(`${this.url}productos/${id}/`, producto); }
}