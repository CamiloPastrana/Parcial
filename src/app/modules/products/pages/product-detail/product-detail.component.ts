import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: false,
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  cartItemCount: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.apiService.getProductById(productId).subscribe(data => {
        this.product = data;
      });
    }

    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.showToast('¡Producto agregado al carrito!');
  }

  goToCart() {
    this.router.navigate(['/cart'], { replaceUrl: true });
  }
  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
