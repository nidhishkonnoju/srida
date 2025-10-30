import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: UserAuthComponent },
  { path: '**', redirectTo: '' }
];