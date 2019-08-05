import { OrderSuccessComponent } from './order-success/order-success.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, Query } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/categories').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    )
  }
}
