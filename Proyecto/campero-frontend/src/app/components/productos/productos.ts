import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  private storeService = inject(StoreService);
  public authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  categorias: any[] = [];
  productosPorCategoria: { [key: number]: any[] } = {};

  // Variables para la UI (Notificaciones)
  toastMessage: string = '';
  showToast: boolean = false;

  // Modal de confirmación (Cliente)
  showConfirmModal: boolean = false;
  itemAEliminar: any = null;

  // --- VARIABLES PARA ADMIN ---
  showAdminFormModal: boolean = false;
  showAdminDeleteModal: boolean = false;
  isEditing: boolean = false;
  productoAEliminarId: number | null = null;

  // Objeto que se conectará al formulario de Admin
  productoForm: any = { id: null, nombre: '', descripcion: '', precio: null, categoria: null, imagen_url: '' };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarData();
    }
  }

  cargarData() {
    this.storeService.getCategorias().subscribe(cats => {
      this.categorias = cats;
      this.storeService.getProductos().subscribe(prods => {
        // Agrupamos los productos por el ID de su categoría
        this.categorias.forEach(cat => {
          this.productosPorCategoria[cat.id] = prods.filter(p => p.categoria === cat.id);
        });
        this.cdr.detectChanges();
      });
    });
  }

  // ==========================================
  // --- LÓGICA DEL CARRITO (CLIENTES) ---
  // ==========================================

  getCantidadEnCarrito(productoId: number): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');
    const item = carrito.find((i: any) => i.producto.id === productoId);
    return item ? item.cantidad : 0;
  }

  cambiarCantidad(producto: any, cambio: number) {
    let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');
    const index = carrito.findIndex((i: any) => i.producto.id === producto.id);

    if (index !== -1) {
      const nuevaCantidad = carrito[index].cantidad + cambio;
      if (nuevaCantidad <= 0) {
        this.itemAEliminar = carrito[index];
        this.showConfirmModal = true;
      } else {
        carrito[index].cantidad = nuevaCantidad;
        this.guardarYAvisar(carrito, null);
      }
    } else if (cambio > 0) {
      carrito.push({ producto: producto, cantidad: 1 });
      this.guardarYAvisar(carrito, `¡${producto.nombre} agregado!`);
    }
  }

  confirmarEliminacion(confirmado: boolean) {
    if (confirmado && this.itemAEliminar) {
      let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');
      carrito = carrito.filter((i: any) => i.producto.id !== this.itemAEliminar.producto.id);
      this.guardarYAvisar(carrito, `${this.itemAEliminar.producto.nombre} eliminado.`);
    }
    this.showConfirmModal = false;
    this.itemAEliminar = null;
  }

  private guardarYAvisar(carrito: any[], mensaje: string | null) {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    this.storeService.actualizarContadorCarrito();

    if (mensaje) {
      this.mostrarNotificacion(mensaje);
    }
    this.cdr.detectChanges();
  }

  mostrarNotificacion(mensaje: string) {
    this.toastMessage = mensaje;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  scrollToCategory(categoryId: number) {
    const element = document.getElementById(`cat-${categoryId}`);
    if (element) {
      const yOffset = -150;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // ==========================================
  // --- MÉTODOS DE ADMINISTRADOR ---
  // ==========================================

  abrirModalCrear() {
    this.isEditing = false;
    this.productoForm = { id: null, nombre: '', descripcion: '', precio: null, categoria: null, imagen_url: '' };
    this.showAdminFormModal = true;
  }

  abrirModalEditar(prod: any) {
    this.isEditing = true;
    this.productoForm = { ...prod }; // Copia los datos para no afectar la vista antes de guardar
    this.showAdminFormModal = true;
  }

  cerrarModalFormulario() {
    this.showAdminFormModal = false;
  }

  guardarProducto(form: NgForm) {
    if (form.invalid) return;

    // 1. Creamos una copia de los datos para limpiarlos antes de enviarlos
    const payload = { ...this.productoForm };

    // 2. Nos aseguramos de que los números se envíen como números (no como texto)
    payload.precio = parseFloat(payload.precio);
    payload.categoria = parseInt(payload.categoria, 10);

    if (this.isEditing) {
      // MODO EDICIÓN (PUT)
      this.storeService.editarProducto(payload.id, payload).subscribe({
        next: () => {
          this.mostrarNotificacion('¡Producto actualizado con éxito!');
          this.cargarData();
          this.cerrarModalFormulario();
        },
        error: (err) => {
          console.error('Error exacto de Django al editar:', err.error);
          this.mostrarNotificacion('Error al actualizar. Revisa la consola (F12).');
        }
      });
    } else {
      // MODO CREACIÓN (POST)
      // 3. Borramos el ID nulo para que Django lo asigne automáticamente
      delete payload.id;

      this.storeService.crearProducto(payload).subscribe({
        next: () => {
          this.mostrarNotificacion('¡Producto creado con éxito!');
          this.cargarData();
          this.cerrarModalFormulario();
        },
        error: (err) => {
          // 4. Imprimimos el error exacto en la consola para saber qué falta
          console.error('Error exacto de Django al crear:', err.error);

          // Tratamos de extraer el mensaje de error de Django para mostrarlo en pantalla
          let mensajeError = 'Revisa los datos ingresados.';
          if (err.error && typeof err.error === 'object') {
            // Toma el primer error que envíe la base de datos (ej. "nombre: Este campo es obligatorio")
            const primerCampo = Object.keys(err.error)[0];
            mensajeError = `${primerCampo}: ${err.error[primerCampo][0]}`;
          }

          this.mostrarNotificacion('Error: ' + mensajeError);
        }
      });
    }
  }
  intentarEliminarProducto(id: number) {
    this.productoAEliminarId = id;
    this.showAdminDeleteModal = true;
  }

  confirmarEliminacionAdmin(confirmado: boolean) {
    if (confirmado && this.productoAEliminarId !== null) {
      this.storeService.eliminarProducto(this.productoAEliminarId).subscribe({
        next: () => {
          this.mostrarNotificacion('Producto eliminado del catálogo.');
          this.cargarData();
        },
        error: () => this.mostrarNotificacion('Error al eliminar.')
      });
    }
    this.showAdminDeleteModal = false;
    this.productoAEliminarId = null;
  }
}