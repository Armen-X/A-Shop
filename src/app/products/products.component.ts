import { ShoppingCartService } from './../shopping-cart.service';
import { product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: product[] = [];
  filteredProducts: product[] = [];
  category: string;
  subscription: Subscription;
  cart: any;

  constructor(
    route: ActivatedRoute,
    ProductService: ProductService,
    private shoppingCartService: ShoppingCartService ){

    ProductService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;

        });
    }
    
    async ngOnInit(){  //here use to be Valueofchange where pipe is located
      this.subscription = (await this.shoppingCartService.getCart())
      .pipe().subscribe(cart => this.cart = cart);
     }
    ngOnDestroy(){
    this.subscription.unsubscribe();
    }
}
