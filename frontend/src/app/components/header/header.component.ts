import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top custom-header">
      <div class="container">
        <a class="navbar-brand fw-bold fs-3" routerLink="/">
           SRIDA
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/categories" routerLinkActive="active">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cart" routerLinkActive="active">
                <i class="fas fa-shopping-cart me-1"></i>
                Cart <span class="badge bg-light text-dark ms-1">{{cartItemCount}}</span>
              </a>
            </li>
            
            <!-- User Dropdown or Login Link -->
            <li class="nav-item dropdown" *ngIf="currentUser; else loginLink">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user me-1"></i>
                {{ currentUser.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <span class="dropdown-item-text small text-muted">
                    Signed in as<br>
                    <strong>{{ currentUser.email }}</strong>
                  </span>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-user me-2"></i>Profile
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-shopping-bag me-2"></i>My Orders
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-heart me-2"></i>Wishlist
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#" (click)="logout($event)">
                    <i class="fas fa-sign-out-alt me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
            
            <ng-template #loginLink>
              <li class="nav-item">
                <a class="nav-link" routerLink="/auth" routerLinkActive="active">
                  <i class="fas fa-user me-1"></i>
                  Login
                </a>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .custom-header {
      background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(210, 105, 30, 0.95)) !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
      padding: 12px 0;
      transition: all 0.3s ease;
    }
    
    .nav-link {
      font-weight: 500;
      margin: 0 8px;
      border-radius: 8px;
      padding: 8px 16px !important;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      background-color: rgba(255,255,255,0.15);
      transform: translateY(-1px);
    }
    
    .navbar-brand {
      transition: all 0.3s ease;
    }
    
    .navbar-brand:hover {
      transform: scale(1.05);
    }

    .dropdown-menu {
      border: none;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-top: 8px;
    }

    .dropdown-item {
      border-radius: 5px;
      margin: 2px 8px;
      padding: 8px 12px;
      transition: all 0.3s ease;
    }

    .dropdown-item:hover {
      background-color: #f8f9fa;
    }

    .dropdown-item-text {
      padding: 8px 12px;
    }

    :host {
      display: block;
    }
  `]
})
export class HeaderComponent {
  cartItemCount = 0;
  currentUser: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    // Subscribe to cart count updates
    this.cartService.getCartCount().subscribe((count: number) => {
      this.cartItemCount = count;
    });

    // Subscribe to user auth updates
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      console.log('👤 User updated:', user);
    });
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    console.log('🚪 User logged out');
  }
}