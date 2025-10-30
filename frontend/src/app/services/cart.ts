import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  item: any;
  quantity: number;
  category: string;
  subcategory: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'  // This makes it available for dependency injection
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartFromStorage();
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  getCartTotal() {
    return this.cartTotalSubject.asObservable();
  }

  getCartCount() {
    return this.cartCountSubject.asObservable();
  }

  addToCart(item: any, category: string, subcategory: string) {
    const existingItem = this.cartItems.find(cartItem => 
      cartItem.item._id === item._id && 
      cartItem.category === category
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.item.price * existingItem.quantity;
    } else {
      this.cartItems.push({
        item: item,
        quantity: 1,
        category: category,
        subcategory: subcategory,
        totalPrice: item.price
      });
    }

    this.updateCart();
  }

  removeFromCart(itemId: string, category: string) {
    this.cartItems = this.cartItems.filter(cartItem => 
      !(cartItem.item._id === itemId && cartItem.category === category)
    );
    this.updateCart();
  }

  updateQuantity(itemId: string, category: string, quantity: number) {
    const item = this.cartItems.find(cartItem => 
      cartItem.item._id === itemId && cartItem.category === category
    );
    
    if (item) {
      if (quantity < 1) {
        this.removeFromCart(itemId, category);
      } else {
        item.quantity = quantity;
        item.totalPrice = item.item.price * quantity;
        this.updateCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private calculateTotal(): number {
    return this.cartItems.reduce((total, cartItem) => {
      return total + cartItem.totalPrice;
    }, 0);
  }

  private calculateCount(): number {
    return this.cartItems.reduce((count, cartItem) => {
      return count + cartItem.quantity;
    }, 0);
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems]);
    this.cartTotalSubject.next(this.calculateTotal());
    this.cartCountSubject.next(this.calculateCount());
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem('srida_cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem('srida_cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
  }

  applyCoupon(couponCode: string): number {
    const coupons: { [key: string]: number } = {
      'SRIDA10': 10,
      'WEDDING25': 25,
      'LOVE50': 50
    };
    return coupons[couponCode] || 0;
  }

  getFinalPrice(discountPercent: number): number {
    const total = this.calculateTotal();
    return total - (total * discountPercent / 100);
  }
}