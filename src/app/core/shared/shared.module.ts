import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartItemComponent } from 'src/app/components/cart-item/cart-item.component';
import { FilterDropdownComponent } from '../../components/filter-dropdown/filter-dropdown.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    CartItemComponent,
    FilterDropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductCardComponent,
    CartItemComponent,
    FilterDropdownComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class SharedModule { }
