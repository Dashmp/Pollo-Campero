import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  public authService = inject(AuthService);
  private storeService = inject(StoreService);
  private platformId = inject(PLATFORM_ID);

  items: any[] = [];
  total: number = 0;

  mostrarMetodoPago: boolean = false;
  mostrarTicket: boolean = false;

  metodoPago: 'tarjeta' | 'qr' | null = null;
  miQrDeCobroUrl: string = 'assets/QR/codigo-qr.jpeg';

  qrTicketUrl: string = '';
  fechaActual: Date = new Date();
  numeroTicket: number = Math.floor(Math.random() * 10000) + 1000;
  nombreCliente: string = '';

  showConfirmModal: boolean = false;
  itemAEliminar: any = null;

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    if (isPlatformBrowser(this.platformId)) {
      // CARGA DESDE SESIÓN
      this.items = JSON.parse(sessionStorage.getItem('carrito') || '[]');
      this.recalcular();
    }
  }

  cambiarCantidad(item: any, valor: number) {
    const nuevaCantidad = item.cantidad + valor;
    if (nuevaCantidad <= 0) {
      this.itemAEliminar = item;
      this.showConfirmModal = true;
    } else {
      item.cantidad = nuevaCantidad;
      this.actualizar();
    }
  }

  eliminarItem(item: any) {
    this.itemAEliminar = item;
    this.showConfirmModal = true;
  }

  confirmarEliminacion(confirmado: boolean) {
    if (confirmado && this.itemAEliminar) {
      this.items = this.items.filter(i => i.producto.id !== this.itemAEliminar.producto.id);
      this.actualizar();
    }
    this.showConfirmModal = false;
    this.itemAEliminar = null;
  }
  
  private actualizar() {
    if (isPlatformBrowser(this.platformId)) {
      // GUARDA EN SESIÓN
      sessionStorage.setItem('carrito', JSON.stringify(this.items));
      this.storeService.actualizarContadorCarrito(); 
      this.recalcular();
    }
  }

  private recalcular() {
    this.total = this.items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  }

  iniciarCheckout() {
    if (this.items.length === 0) return;
    this.mostrarMetodoPago = true;
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'qr') {
    this.metodoPago = metodo;
  }

  procesarPago() {
    this.nombreCliente = this.authService.getUserName();

    const datosCompra = `Ticket #${this.numeroTicket} | Cliente: ${this.nombreCliente} | Total: $${this.total.toFixed(2)}`;
    this.qrTicketUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(datosCompra)}`;

    this.mostrarMetodoPago = false;
    this.mostrarTicket = true;
  }

  descargarPDF() {
    if (isPlatformBrowser(this.platformId)) {
      const data = document.getElementById('ticket-pdf-content');
      if (data) {
        html2canvas(data, { scale: 2, useCORS: true, allowTaint: true }).then(canvas => {
          const imgWidth = 208;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png');

          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(contentDataURL, 'PNG', 0, 10, imgWidth, imgHeight);
          pdf.save(`Ticket_Campero_${this.numeroTicket}.pdf`);
        });
      }
    }
  }

  nuevaCompra() {
    this.items = [];
    this.actualizar();
    this.mostrarTicket = false;
    this.mostrarMetodoPago = false;
    this.metodoPago = null;
  }
}