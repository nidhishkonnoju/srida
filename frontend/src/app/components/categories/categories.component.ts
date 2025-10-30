import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Main container with proper top spacing -->
    <div class="categories-page">
      <div class="container-fluid py-5 mt-4">
        
        <!-- Header Section - Left aligned and moved down -->
        <div class="mb-5 pt-5">
          <h1 class="display-4 fw-bold text-brown mb-3">Our Wedding Services</h1>
          <p class="lead text-muted fs-5 mb-4">Complete wedding planning solutions by Srida</p>
          <button class="btn btn-primary btn-lg px-5 py-3" 
                  (click)="loadCategories()" 
                  [disabled]="loading">
            {{ loading ? 'Loading...' : 'Load Services' }}
          </button>
          
          <!-- Debug button -->
          <button class="btn btn-outline-info btn-lg px-4 py-3 ms-3" 
                  (click)="debugData()">
            Debug Data
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="loading" class="text-center py-5">
          <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-4 fs-5">Loading wedding services...</p>
        </div>

        <!-- Data Loaded Successfully -->
        <div *ngIf="!loading && categories.length > 0" class="row g-4 px-3">
          <div class="col-12">
            <div class="alert alert-success">
              <strong>✅ Success!</strong> Loaded {{ categories.length }} categories with {{ getTotalItems() }} total services
            </div>
          </div>
          
          <div *ngFor="let category of categories; let i = index" class="col-12 mb-5">
            <div class="card shadow-lg border-0 category-card">
              <div class="card-header bg-brown text-white py-4">
                <h2 class="mb-2">{{ category.name }}</h2>
                <p class="mb-0 fs-5 opacity-90">{{ category.description }}</p>
              </div>
              <div class="card-body p-4">
                
                <!-- Check if subcategories exist and have items -->
                <div *ngIf="!category.subcategories || category.subcategories.length === 0" 
                     class="alert alert-warning">
                  No subcategories available for {{ category.name }}
                </div>
                
                <div *ngIf="category.subcategories && category.subcategories.length > 0" class="row g-4">
                  <div *ngFor="let subcategory of category.subcategories; let j = index" class="col-md-6">
                    <div class="subcategory-section">
                      <h4 class="text-brown mb-3 pb-2 border-bottom">
                        {{ subcategory.name }} 
                        <small class="text-muted">({{ subcategory.items?.length || 0 }} items)</small>
                      </h4>
                      
                      <!-- Check if items exist in subcategory -->
                      <div *ngIf="!subcategory.items || subcategory.items.length === 0" 
                           class="alert alert-info">
                        No items available in {{ subcategory.name }}
                      </div>
                      
                      <div *ngIf="subcategory.items && subcategory.items.length > 0">
                        <div *ngFor="let item of subcategory.items; let k = index" class="card mb-4 shadow-sm item-card">
                          <div class="card-body p-3">
                            <div class="d-flex justify-content-between align-items-start">
                              <div class="flex-grow-1">
                                <h5 class="card-title mb-2 text-dark">{{ item.name }}</h5>
                                <p class="card-text text-muted mb-2">{{ item.description }}</p>
                                <p class="card-text mb-2">
                                  <strong class="text-success fs-5">₹{{ item.price | number }}</strong>
                                  <small class="text-muted ms-2">per service</small>
                                </p>
                                <p class="card-text mb-0">
                                  <small class="text-muted">
                                    <i class="fas fa-store me-1"></i>
                                    Vendor: {{ item.vendor }}
                                  </small>
                                </p>
                                <small class="text-muted d-block mt-1">
                                  ID: {{ item._id }}
                                </small>
                              </div>
                              <button class="btn btn-primary ms-3 px-3" 
                                      (click)="addToCart(item, category.name, subcategory.name)">
                                <i class="fas fa-cart-plus me-2"></i>
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div *ngIf="!loading && categories.length === 0 && !error" class="text-center py-5">
          <div class="alert alert-info">
            <h5>No services loaded yet</h5>
            <p>Click "Load Services" to load wedding services from the backend</p>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="alert alert-danger text-center">
          <h5>⚠️ Error Loading Services</h5>
          <p>{{ error }}</p>
          <button class="btn btn-outline-danger" (click)="loadCategories()">Try Again</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .categories-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding-top: 20px;
    }

    .bg-brown { 
      background: linear-gradient(135deg, #8B4513, #D2691E) !important; 
      border: none !important;
    }

    .text-brown { 
      color: #8B4513 !important; 
    }

    .category-card {
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
    }

    .item-card {
      border-radius: 12px;
      border: 1px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .item-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.08) !important;
      border-color: #8B4513;
    }

    .subcategory-section {
      padding: 0 10px;
    }

    .card-header {
      border-radius: 0 !important;
    }

    /* Ensure proper spacing from fixed header */
    :host {
      display: block;
      padding-top: 80px;
    }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Categories component initialized');
  }

  loadCategories() {
    this.loading = true;
    this.error = '';
    this.categories = [];
    
    console.log('🔄 Loading categories from backend...');
    
    this.http.get<any[]>('/api/categories')
      .subscribe({
        next: (data) => {
          console.log('✅ RAW DATA RECEIVED:', data);
          console.log('📊 Full data structure:', JSON.stringify(data, null, 2));
          
          // Process the data to ensure it's in the right format
          this.categories = this.processCategories(data);
          this.loading = false;
          
          console.log('🎯 PROCESSED CATEGORIES:', this.categories);
          console.log('📈 Total categories:', this.categories.length);
          console.log('📦 Total items:', this.getTotalItems());
        },
        error: (error: HttpErrorResponse) => {
          console.error('❌ Error loading categories:', error);
          this.loading = false;
          this.error = `Failed to load services: ${error.message}`;
        }
      });
  }

  // Process categories to ensure proper data structure
  processCategories(data: any[]): any[] {
    return data.map(category => {
      console.log('🔍 Processing category:', category.name);
      console.log('📁 Category subcategories:', category.subcategories);
      
      // Ensure subcategories is an array
      const processedSubcategories = (category.subcategories || []).map((subcat: any) => {
        console.log('📂 Processing subcategory:', subcat.name);
        console.log('📄 Subcategory items:', subcat.items);
        
        return {
          name: subcat.name || 'Unnamed Subcategory',
          items: subcat.items || [] // Ensure items is an array
        };
      });
      
      return {
        _id: category._id,
        name: category.name,
        description: category.description,
        image: category.image,
        subcategories: processedSubcategories
      };
    });
  }

  getTotalItems(): number {
    let total = 0;
    this.categories.forEach(category => {
      category.subcategories?.forEach((subcat: any) => {
        total += subcat.items?.length || 0;
      });
    });
    return total;
  }

  debugData() {
    console.log('🐛 DEBUG DATA:', {
      categories: this.categories,
      categoriesCount: this.categories.length,
      totalItems: this.getTotalItems(),
      firstCategory: this.categories[0],
      firstSubcategory: this.categories[0]?.subcategories?.[0],
      firstItem: this.categories[0]?.subcategories?.[0]?.items?.[0]
    });
  }

  addToCart(item: any, categoryName: string, subcategoryName: string) {
    alert(`🎉 Added to cart: ${item.name}\n💰 Price: ₹${item.price}\n📦 Vendor: ${item.vendor}`);
    console.log('Adding to cart:', { item, categoryName, subcategoryName });
  }
}