import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  cartItems: { product: any; quantity: number }[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.filter(item => item.product);
      this.calculateTotal();
    });
  }

  goHome() {
    this.router.navigate(["/products/home"], {replaceUrl: true})
  }

  goCheckout(){
    this.router.navigate(["/checkout"], {replaceUrl: true})
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.product?.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.product?.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  }
}
