import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="cart-page">
      <div class="container py-5 mt-4">
        
        <!-- Header -->
        <div class="mb-5">
          <h1 class="display-4 fw-bold text-brown">Your Wedding Cart</h1>
          <p class="lead text-muted">Review your selected services</p>
        </div>

        <!-- Empty Cart -->
        <div *ngIf="cartItems.length === 0" class="text-center py-5">
          <div class="empty-cart-icon mb-4">
            <i class="fas fa-shopping-cart fa-5x text-muted"></i>
          </div>
          <h3 class="text-muted mb-3">Your cart is empty</h3>
          <p class="text-muted mb-4">Start adding wedding services to see them here</p>
          <button class="btn btn-primary btn-lg px-5" routerLink="/categories">
            <i class="fas fa-gem me-2"></i>
            Browse Services
          </button>
        </div>

        <!-- Cart Items -->
        <div *ngIf="cartItems.length > 0" class="row">
          <!-- Cart Items List -->
          <div class="col-lg-8">
            <div class="card shadow-sm mb-4">
              <div class="card-header bg-brown text-white">
                <h4 class="mb-0">
                  <i class="fas fa-shopping-cart me-2"></i>
                  Selected Services ({{ cartItems.length }})
                </h4>
              </div>
              <div class="card-body">
                <div *ngFor="let cartItem of cartItems; let i = index" class="cart-item border-bottom pb-3 mb-3">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <h5 class="mb-1">{{ cartItem.item.name }}</h5>
                      <p class="text-muted mb-1 small">{{ cartItem.item.description }}</p>
                      <p class="mb-1">
                        <span class="badge bg-light text-dark me-2">{{ cartItem.category }}</span>
                        <span class="badge bg-secondary">{{ cartItem.subcategory }}</span>
                      </p>
                      <p class="mb-0 small text-muted">
                        <i class="fas fa-store me-1"></i>
                        {{ cartItem.item.vendor }}
                      </p>
                    </div>
                    <div class="col-md-2 text-center">
                      <div class="quantity-controls">
                        <button class="btn btn-outline-secondary btn-sm" 
                                (click)="updateQuantity(cartItem, cartItem.quantity - 1)">
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2 fw-bold">{{ cartItem.quantity }}</span>
                        <button class="btn btn-outline-secondary btn-sm" 
                                (click)="updateQuantity(cartItem, cartItem.quantity + 1)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-md-2 text-center">
                      <h5 class="text-success">₹{{ cartItem.totalPrice | number }}</h5>
                      <small class="text-muted">₹{{ cartItem.item.price | number }} each</small>
                    </div>
                    <div class="col-md-2 text-center">
                      <button class="btn btn-outline-danger btn-sm" 
                              (click)="removeItem(cartItem)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="col-lg-4">
            <div class="card shadow-sm sticky-top" style="top: 100px;">
              <div class="card-header bg-dark text-white">
                <h4 class="mb-0">Order Summary</h4>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{{ cartTotal | number }}</span>
                </div>
                
                <!-- Coupon Section -->
                <div class="coupon-section mb-3">
                  <label class="form-label small">Have a coupon?</label>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Enter coupon code" 
                           [(ngModel)]="couponCode">
                    <button class="btn btn-outline-primary" (click)="applyCoupon()">Apply</button>
                  </div>
                  <div *ngIf="discount > 0" class="text-success small mt-1">
                    🎉 {{ discount }}% discount applied!
                  </div>
                </div>

                <div *ngIf="discount > 0" class="d-flex justify-content-between mb-2">
                  <span>Discount ({{ discount }}%):</span>
                  <span class="text-success">-₹{{ (cartTotal * discount / 100) | number }}</span>
                </div>

                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <strong>Total Amount:</strong>
                  <strong class="text-success fs-5">₹{{ finalPrice | number }}</strong>
                </div>

                <button class="btn btn-primary w-100 py-2 mb-2" 
                        (click)="proceedToCheckout()"
                        [disabled]="cartItems.length === 0">
                  <i class="fas fa-credit-card me-2"></i>
                  Proceed to Checkout
                </button>

                <button class="btn btn-outline-danger w-100 py-2" 
                        (click)="clearCart()">
                  <i class="fas fa-trash me-2"></i>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    .text-brown {
      color: #8B4513 !important;
    }

    .bg-brown {
      background: linear-gradient(135deg, #8B4513, #D2691E) !important;
    }

    .cart-item {
      transition: all 0.3s ease;
    }

    .cart-item:hover {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 10px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-cart-icon {
      opacity: 0.5;
    }

    :host {
      display: block;
      padding-top: 80px;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  finalPrice: number = 0;
  discount: number = 0;
  couponCode: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart updates
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });

    this.cartService.getCartTotal().subscribe((total: number) => {
      this.cartTotal = total;
      this.calculateFinalPrice();
    });
  }

  updateQuantity(cartItem: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(cartItem.item._id, cartItem.category, newQuantity);
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.item._id, cartItem.category);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  applyCoupon() {
    this.discount = this.cartService.applyCoupon(this.couponCode);
    this.calculateFinalPrice();
    
    if (this.discount === 0 && this.couponCode) {
      alert('Invalid coupon code! Try: SRIDA10, WEDDING25, or LOVE50');
    }
  }

  calculateFinalPrice() {
    this.finalPrice = this.cartService.getFinalPrice(this.discount);
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert(`🎊 Ready to book your wedding services!\n\nTotal: ₹${this.finalPrice}\n\nCheckout functionality coming soon!`);
  }
}