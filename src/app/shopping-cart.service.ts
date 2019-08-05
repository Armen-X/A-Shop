import { product } from './models/product';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs-compat/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';








@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-cart').push({
     dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).snapshotChanges()
    .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
    
  }
  
  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);

  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  async addToCart(product: product){
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product: product){
    this.updateItemQuantity(product, -1)    
  }

  private async updateItemQuantity(product: product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)
    item$.valueChanges()
    .take(1)
    .subscribe(item => {
      if (item) 
      item$.update({ quantity: item['quantity'] + change });
      else 
      item$.set({ product, quantity: 1 });
    });
  }
      

     
      

  
}
    