import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input } from '@angular/core';
import { product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product: product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppinngCart;
 
  constructor(private ShoppingCartService: ShoppingCartService) { }

  addToCart(){
    this.ShoppingCartService.addToCart(this.product);
  }

  removeFromCart(){
    this.ShoppingCartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppinngCart) return 0;
    let item = this.shoppinngCart.items[this.product.key];  
    return item ? item.quantity : 0;
  }
  

}
