export interface User {
  id?: number;
  name: string;
  lastName: string;
  email?: string;
  username?: string;
  password?: string; 

  address: {
    street: string;
    city: string;
    zipcode: string;
    country: string;
  };

  cardDetails?: {
    cardNumber: string;
    cvc: string;
    expirationDate: string;
  };
}
