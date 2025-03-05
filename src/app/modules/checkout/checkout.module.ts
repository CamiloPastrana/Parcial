import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CheckoutRoutingModule,
    FormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutModule { }