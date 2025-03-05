import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: false,
})
export class SummaryComponent implements OnInit {
  userData: User = {
    name: '',
    lastName: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      country: ''
    },
    cardDetails: {
      cardNumber: '',
      cvc: '',
      expirationDate: ''
    }
  };
  
  total: number = 0;
  showAnimation: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.userData = navigation.extras.state['userData'] ?? {
        name: '',
        lastName: '',
        address: {
          street: '',
          city: '',
          zipcode: '',
          country: ''
        },
        cardDetails: {
          cardNumber: '',
          cvc: '',
          expirationDate: ''
        }
      };

      // 🔹 Verificar que `total` se recibe correctamente
      if (typeof navigation.extras.state['total'] === 'number') {
        this.total = navigation.extras.state['total'];
        console.log("Total recibido en Summary:", this.total); // Verificar en consola
      } else {
        console.warn("No se recibió el total correctamente.");
      }

      setTimeout(() => {
        this.showAnimation = true;
      }, 300);
    } else {
      this.router.navigate(['/checkout']);
    }
  }

  goHome() {
    this.router.navigate(["/products/home"], { replaceUrl: true });
  }

  get maskedCardNumber(): string {
    if (!this.userData?.cardDetails?.cardNumber) {
      return '****';
    }

    const cardNum = String(this.userData.cardDetails.cardNumber);
    return cardNum.length >= 4 ? cardNum.slice(-4) : '****';
  }
}
