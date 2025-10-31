import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserFromStorage();
    }
  }

  // Mock login for testing
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          name: this.getUserNameFromEmail(email),
          email: email,
          phone: '9876543210'
        };
        
        this.currentUserSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('srida_user', JSON.stringify(user));
        }
        console.log('🔐 User logged in:', user.name);
        resolve(true);
      }, 1000);
    });
  }

  // Mock registration
  register(userData: any): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '2',
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        };
        
        this.currentUserSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('srida_user', JSON.stringify(user));
        }
        console.log('🔐 User registered:', user.name);
        resolve(true);
      }, 1000);
    });
  }

  // Logout user
  logout(): void {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('srida_user');
    }
    console.log('🔐 User logged out');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Load user from localStorage
  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('srida_user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          this.currentUserSubject.next(user);
          console.log('🔐 User loaded from storage:', user.name);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }

  // Helper to get user name from email
  private getUserNameFromEmail(email: string): string {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }
}