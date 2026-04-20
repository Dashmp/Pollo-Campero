// ============================================================
// SERVICIO: CartService (Carrito de Compras)
// ============================================================
// Este servicio gestiona el estado del carrito de compras de la aplicación
// Utiliza Signals de Angular para reactividad y computed para valores derivados

// Importación de decoradores y funciones reactivas de Angular
// - Injectable: Decorador que permite inyectar este servicio en otros componentes
// - signal: Crea una señal reactiva (estado observable)
// - computed: Crea un valor derivado que se actualiza automáticamente
import { Injectable, signal, computed } from '@angular/core';

// ============================================================
// INTERFAZ: Producto
// ============================================================
// Definimos la interfaz aquí mismo (en lugar de importarla desde otro archivo)
// Esto define la estructura de datos que tendrá cada producto en el carrito

export interface Producto {
  nombre: string;      // Nombre del producto (ej: "Combo Campero")
  precio: number;      // Precio unitario del producto en dólares
  imagen: string;      // Ruta de la imagen del producto (ej: "assets/productos/...")
  categoria: string;   // Categoría a la que pertenece (ej: "PROMOCIONES", "BEBIDAS")
  cantidad?: number;   // Cantidad del producto (opcional, con '?' puede ser undefined)
  // Nota: El comentario "//" al final sugiere que esta propiedad podría ser usada
  // para manejar múltiples unidades del mismo producto en el futuro
}

// ============================================================
// DECORADOR @Injectable
// ============================================================
// providedIn: 'root' - Este servicio es singleton a nivel de aplicación
// Angular lo crea una sola vez y lo comparte con toda la app
// No es necesario agregarlo manualmente en los providers de los módulos
@Injectable({ providedIn: 'root' })

// ============================================================
// CLASE PRINCIPAL: CartService
// ============================================================
export class CartService {
  
  // ============================================================
  // SEÑAL PRINCIPAL: items
  // ============================================================
  // Inicializamos con el tipo Producto para matar el error 'unknown'
  // signal<Producto[]> - Define explícitamente que esta señal contiene un array de Productos
  // El comentario indica que antes TypeScript infería 'unknown' y se solucionó tipando la señal
  // Valor inicial: Array vacío []
  public items = signal<Producto[]>([]);
  
  // Nota: El comentario "//" sugiere que podría haber más código o comentarios aquí

  // ============================================================
  // SEÑALES COMPUTADAS (VALORES DERIVADOS)
  // ============================================================
  // computed() crea señales de solo lectura que se actualizan automáticamente
  // cuando la señal 'items' cambia
  
  // ============================================================
  // subtotal
  // ============================================================
  // Propósito: Calcular la suma de todos los precios de los productos en el carrito
  // Fórmula: Suma de p.precio para cada producto en items()
  // reduce(): Acumulador 'acc' que suma cada precio
  // El método reduce suma el precio de cada producto, comenzando desde 0
  public subtotal = computed(() => 
    this.items().reduce((acc, p) => acc + p.precio, 0)
  );
  
  // ============================================================
  // iva (Impuesto al Valor Agregado)
  // ============================================================
  // Propósito: Calcular el IVA del 15% sobre el subtotal
  // Fórmula: subtotal * 0.15
  // Nota: 0.15 representa el 15% de impuesto (tasa estándar en Ecuador)
  public iva = computed(() => this.subtotal() * 0.15);
  
  // ============================================================
  // total
  // ============================================================
  // Propósito: Calcular el monto total a pagar (subtotal + IVA)
  // Fórmula: subtotal + iva
  // Este valor es el que el cliente pagará al finalizar la compra
  public total = computed(() => this.subtotal() + this.iva());

  // ============================================================
  // MÉTODO: addToCart
  // ============================================================
  // Propósito: Agregar un producto al carrito de compras
  // @param p: Producto - El producto a agregar (debe cumplir la interfaz Producto)
  // 
  // Cómo funciona:
  // 1. items.update() - Actualiza la señal items con el nuevo estado
  // 2. prev => [...prev, p] - Toma el estado anterior (prev) y crea un nuevo array
  // 3. El operador spread (...) copia todos los productos existentes
  // 4. Se añade el nuevo producto 'p' al final del array
  // 
  // Nota: Este método NO maneja cantidades - agrega el producto como un nuevo ítem
  // Si se agrega el mismo producto dos veces, aparecerá duplicado en el carrito
  addToCart(p: Producto) {
    this.items.update(prev => [...prev, p]);
  }

  // ============================================================
  // MÉTODO: clearCart
  // ============================================================
  // Propósito: Vaciar completamente el carrito de compras
  // 
  // Cómo funciona:
  // items.set([]) - Reemplaza el array actual con un array vacío
  // Esto elimina todos los productos del carrito
  // 
  // Uso típico: Después de finalizar una compra o cuando el usuario
  // hace clic en "Nueva Compra" o "Limpiar Carrito"
  clearCart() {
    this.items.set([]);
  }
}