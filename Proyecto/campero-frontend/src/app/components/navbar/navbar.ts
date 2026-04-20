import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  public authService = inject(AuthService);
  private storeService = inject(StoreService); // Inyectamos el StoreService
  
  cartCount: number = 0;

  ngOnInit() {
    // Nos suscribimos para escuchar los cambios en tiempo real
    this.storeService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}