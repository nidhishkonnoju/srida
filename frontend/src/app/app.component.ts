import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <footer class="bg-dark text-white py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>Srida Wedding Planner</h5>
            <p class="mb-0">Making your wedding dreams come true with elegance and tradition.</p>
          </div>
          <div class="col-md-3">
            <h6>Quick Links</h6>
            <ul class="list-unstyled">
              <li><a routerLink="/" class="text-light text-decoration-none">Home</a></li>
              <li><a routerLink="/categories" class="text-light text-decoration-none">Services</a></li>
              <li><a routerLink="/cart" class="text-light text-decoration-none">Cart</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h6>Contact Info</h6>
            <p class="mb-1">📞 +91 9876543210</p>
            <p class="mb-1">✉️ info@srida.com</p>
            <p class="mb-0">📍 Hyderabad, India</p>
          </div>
        </div>
        <hr class="my-4">
        <div class="text-center">
          <p class="mb-0">&copy; 2024 Srida Wedding Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .main-content {
      padding-top: 80px; /* This pushes content below the fixed header */
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent {
  title = 'Srida ';
}