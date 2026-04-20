// cart.spec.ts
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart';  // ← cambia Cart por CartService

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});