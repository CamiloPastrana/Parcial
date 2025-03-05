import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent {
  @Input() product!: Product; // Recibe un producto

  constructor(private router: Router) {}

  viewProduct() {
    this.router.navigate(['/products/detail', this.product.id], { replaceUrl: true });
  }
}
