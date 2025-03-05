import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { CartService } from 'src/app/core/services/cart.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false,
})
export class CheckoutComponent implements OnInit {
  userData: User = {
    name: '',
    lastName: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      country: 'Colombia'
    },
    cardDetails: {
      cardNumber: '',
      cvc: '',
      expirationDate: ''
    }
  };

  total = 0;
  selectedPaymentMethod = "credit-card";

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
      console.log("Total calculado en checkout:", this.total);
    });
  }

  async processPayment() {
    if (!this.validateForm()) {
      const toast = await this.toastController.create({
        message: 'Por favor complete todos los campos requeridos',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Procesando...',
      duration: 3000
    });
    await loading.present();
    await loading.onDidDismiss();
  
    console.log("Total enviado antes de limpiar carrito:", this.total); // 👀 Verificar total antes de resetear
    
    const finalTotal = this.total; // 🔹 Guardar total antes de limpiar el carrito
  
    this.cartService.clearCart(); // ❌ Aquí antes se reseteaba el total
    console.log("Total después de limpiar carrito:", finalTotal); // 🔹 Verificar que se mantiene
  
    this.router.navigate(['/checkout/summary'], { 
      replaceUrl:true,
      state: {
        userData: { ...this.userData },
        total: finalTotal // 🔹 Ahora pasamos `finalTotal`, que sigue siendo correcto
      }
    });
  }
  
  validateForm(): boolean {
    if (!this.userData.name || !this.userData.lastName) return false;
    if (!this.userData.address.street || !this.userData.address.city || !this.userData.address.zipcode) return false;
    if (
      this.selectedPaymentMethod === "credit-card" &&
      (!this.userData.cardDetails!.cardNumber ||
        !this.userData.cardDetails!.cvc ||
        !this.userData.cardDetails!.expirationDate)
    ) {
      return false;
    }
    return true;
  }
}
