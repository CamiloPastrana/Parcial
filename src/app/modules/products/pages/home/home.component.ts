import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedCategory: string = 'all';
  cartItemCount: number = 0;
  searchTerm = "";

  constructor(
    private apiService: ApiService, 
    private cartService: CartService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  loadProducts() {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...data];
      this.sortProducts();
    });
  }

  onSearchChange() {
    this.applyFilters()
  }

  applyFilters() {
    let result = [...this.products]

    if (this.selectedCategory !== "all") {
      result = result.filter((product) => product.category === this.selectedCategory)
    }

    if (this.searchTerm && this.searchTerm.trim() !== "") {
      const term = this.searchTerm.toLowerCase().trim()
      result = result.filter((product) => product.title.toLowerCase().includes(term))
    }

    this.filteredProducts = result
    this.sortProducts()
  }

  filterByCategory(category: string) {
    this.selectedCategory = category
    this.applyFilters()
  }

  setSortDirection(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
    this.sortProducts();
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => 
      this.sortDirection === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  viewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToCart() {
    this.router.navigate(['/cart'], { replaceUrl: true });
  }

  async presentCategoryActionSheet() {
    const buttons = [
      {
        text: "All Items",
        handler: () => {
          this.filterByCategory("all")
        },
      },
      ...this.categories.map((category) => ({
        text: category,
        handler: () => {
          this.filterByCategory(category)
        },
      })),
      {
        text: "Cancel",
        role: "cancel",
      },
    ]

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Category",
      buttons,
    })

    await actionSheet.present()
  }
}
