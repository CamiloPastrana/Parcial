import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  standalone: false,
})
export class CartItemComponent {
  @Input() product!: Product;
  @Input() quantity!: number;
  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  increaseQuantity() {
    this.increase.emit(this.product.id);
  }

  decreaseQuantity() {
    this.decrease.emit(this.product.id);
  }

  removeItem() {
    this.remove.emit(this.product.id);
  }
}
