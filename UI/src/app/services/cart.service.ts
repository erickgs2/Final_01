import { Injectable } from '@angular/core';
import { Habitacion } from '../models/habitacion'
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CartService {

  reservas: any[] = [];
  cartTotal = 0;

  private productAddedSource = new Subject<any>();


  productAdded$ = this.productAddedSource.asObservable();

  constructor() { }

  addProductToCart(Habitacion) {
    let exists = false;
    const parsedPrice = parseFloat(Habitacion.precio.replace(/\./g, '').replace(',', '.'));
    this.cartTotal += parsedPrice;
    // Search this product on the cart and increment the quantity
    this.reservas = this.reservas.map(_reserva => {
      if (_reserva.Habitacion.id === Habitacion.id) {
        _reserva.quantity++;
        exists = true;
      }
      return _reserva;
    });
    // Add a new product to the cart if it's a new product
    if (!exists) {
      Habitacion.parsedPrice = parsedPrice;
      this.reservas.push({
        product: Habitacion,
        quantity: 1
      });
    }

    this.productAddedSource.next({ reservas: this.reservas, cartTotal: this.cartTotal });
  }

  deleteProductFromCart(Habitacion) {
    this.reservas = this.reservas.filter(_reserva => {
      if (_reserva.habitacion.id === Habitacion.id) {
        this.cartTotal -= _reserva.product.parsedPrice * _reserva.quantity;
        return false;
      }
      return true;
     });
    this.productAddedSource.next({ reservas: this.reservas, cartTotal: this.cartTotal });
  }


  flushCart() {
    this.reservas = [];
    this.cartTotal = 0;
    this.productAddedSource.next({ reservas: this.reservas, cartTotal: this.cartTotal });
  }
}
