import { product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product){
    return this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    )
  }

  get(productId){
  return this.db.object('/products/' + productId);
  }

  update(productId, product){
   return this.db.object('/products/' + productId).update(product)
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
