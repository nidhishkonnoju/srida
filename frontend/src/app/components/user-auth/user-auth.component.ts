import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Make sure this import is correct

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="container py-5 mt-4">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            
            <!-- Auth Card -->
            <div class="card shadow-lg border-0 auth-card">
              <div class="card-header bg-brown text-white text-center py-4">
                <h2 class="mb-0">
                  <i class="fas fa-heart me-2"></i>
                  {{ isLoginMode ? 'Welcome Back' : 'Join Srida Family' }}
                </h2>
                <p class="mb-0 mt-2 opacity-90">
                  {{ isLoginMode ? 'Sign in to your account' : 'Create your wedding planning account' }}
                </p>
              </div>
              
              <div class="card-body p-5">
                
                <!-- Success Message -->
                <div *ngIf="successMessage" class="alert alert-success">
                  <i class="fas fa-check-circle me-2"></i>
                  {{ successMessage }}
                </div>

                <!-- Error Message -->
                <div *ngIf="errorMessage" class="alert alert-danger">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  {{ errorMessage }}
                </div>

                <!-- Auth Form -->
                <form (ngSubmit)="onSubmit()">
                  
                  <!-- Name Field (Register only) -->
                  <div *ngIf="!isLoginMode" class="mb-4">
                    <label class="form-label fw-semibold">Full Name</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-user"></i>
                      </span>
                      <input type="text" class="form-control" 
                             [(ngModel)]="userData.name" 
                             name="name"
                             placeholder="Enter your full name"
                             required>
                    </div>
                  </div>

                  <!-- Email Field -->
                  <div class="mb-4">
                    <label class="form-label fw-semibold">Email Address</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <input type="email" class="form-control" 
                             [(ngModel)]="userData.email" 
                             name="email"
                             placeholder="Enter your email"
                             required>
                    </div>
                  </div>

                  <!-- Password Field -->
                  <div class="mb-4">
                    <label class="form-label fw-semibold">Password</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-lock"></i>
                      </span>
                      <input type="password" class="form-control" 
                             [(ngModel)]="userData.password" 
                             name="password"
                             placeholder="Enter your password"
                             required
                             minlength="6">
                    </div>
                    <small class="text-muted">Password must be at least 6 characters</small>
                  </div>

                  <!-- Phone Field (Register only) -->
                  <div *ngIf="!isLoginMode" class="mb-4">
                    <label class="form-label fw-semibold">Phone Number</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-phone"></i>
                      </span>
                      <input type="tel" class="form-control" 
                             [(ngModel)]="userData.phone" 
                             name="phone"
                             placeholder="Enter your phone number">
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="btn btn-primary w-100 py-3 fw-semibold" [disabled]="loading">
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <i *ngIf="!loading" class="fas fa-paper-plane me-2"></i>
                    {{ loading ? 'Please Wait...' : (isLoginMode ? 'Sign In' : 'Create Account') }}
                  </button>

                </form>

                <!-- Toggle Mode -->
                <div class="text-center mt-4">
                  <p class="text-muted mb-2">
                    {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
                  </p>
                  <button type="button" class="btn btn-outline-secondary" (click)="toggleMode()" [disabled]="loading">
                    <i class="fas fa-sync me-2"></i>
                    {{ isLoginMode ? 'Create New Account' : 'Sign In Instead' }}
                  </button>
                </div>

                <!-- Quick Demo Login -->
                <div class="text-center mt-3">
                  <p class="text-muted small mb-2">Quick Demo Login</p>
                  <button class="btn btn-outline-info btn-sm me-2" (click)="demoLogin('priya@srida.com')">
                    Login as Priya
                  </button>
                  <button class="btn btn-outline-info btn-sm" (click)="demoLogin('raj@srida.com')">
                    Login as Raj
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    .auth-card {
      border-radius: 20px;
      overflow: hidden;
    }
    .bg-brown {
      background: linear-gradient(135deg, #8B4513, #D2691E) !important;
    }
    :host {
      display: block;
      padding-top: 80px;
    }
  `]
})
export class UserAuthComponent {
  isLoginMode = true;
  loading = false;
  errorMessage = '';
  successMessage = '';
  
  userData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService  // Inject auth service
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForm();
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Basic validation
    if (!this.userData.email || !this.userData.password) {
      this.errorMessage = 'Please fill in all required fields';
      this.loading = false;
      return;
    }

    if (!this.isLoginMode && !this.userData.name) {
      this.errorMessage = 'Please enter your name';
      this.loading = false;
      return;
    }

    try {
      if (this.isLoginMode) {
        await this.authService.login(this.userData.email, this.userData.password);
        this.successMessage = 'Login successful! Welcome back to Srida.';
      } else {
        await this.authService.register(this.userData);
        this.successMessage = 'Account created successfully! Welcome to Srida family.';
      }

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);

    } catch (error) {
      this.errorMessage = 'Authentication failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  demoLogin(email: string) {
    this.userData.email = email;
    this.userData.password = 'demo123';
    this.onSubmit();
  }

  private resetForm() {
    this.userData = {
      name: '',
      email: '',
      password: '',
      phone: ''
    };
    this.errorMessage = '';
    this.successMessage = '';
  }
}