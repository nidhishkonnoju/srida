import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-section">
      <div class="container text-center text-white py-5">
        <h1 class="display-4 fw-bold mb-4">Welcome to Srida Wedding Planner</h1>
        <p class="lead mb-4">Creating magical moments for your special day with traditional elegance and modern charm</p>
        <button class="btn btn-light btn-lg me-3" routerLink="/categories">Explore Services</button>
        <button class="btn btn-outline-light btn-lg" routerLink="/auth">Get Started</button>
      </div>
    </div>

    <div class="container my-5">
      <div class="row text-center mb-5">
        <div class="col">
          <h2 class="section-title">Why Choose Srida?</h2>
          <p class="text-muted">We make your wedding dreams come true</p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="text-warning mb-3" style="font-size: 3rem;">💎</div>
              <h5 class="card-title">Premium Quality</h5>
              <p class="card-text">Only the finest materials and services for your special day</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="text-success mb-3" style="font-size: 3rem;">💰</div>
              <h5 class="card-title">Best Prices</h5>
              <p class="card-text">Competitive pricing without compromising on quality</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="text-primary mb-3" style="font-size: 3rem;">📞</div>
              <h5 class="card-title">24/7 Support</h5>
              <p class="card-text">Dedicated support team available round the clock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(139, 69, 19, 0.8), rgba(210, 105, 30, 0.8)), 
                  url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');
      background-size: cover;
      background-position: center;
      height: 70vh;
      min-height: 500px;
      display: flex;
      align-items: center;
    }
    .section-title {
      color: #8B4513;
      position: relative;
      display: inline-block;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: #D2691E;
    }
  `]
})
export class HomeComponent { }