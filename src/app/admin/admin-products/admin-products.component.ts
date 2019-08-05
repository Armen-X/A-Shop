import { product } from '../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular-bootstrap-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
  products: product[];
  subscription: Subscription;
  tableResource: DataTableResource<product>;
  items: product[] = [];
  itemCount: number;

  constructor(private ProductService: ProductService) { 
    this.subscription = this.ProductService.getAll().
    subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
    
  }
  private initializeTable(products: product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => (this.items = items) )
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(this.tableResource)
    this.tableResource.query(params)
    .then(items => (this.items = items) )
  }

  filter(query: string){
  let filteredProducts = (query) ?  
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;

    this.initializeTable(filteredProducts);
  }
  filter2(query: string){
    let filteredProducts = (query) ?  
      this.products.filter(p => p.title.includes(query)) : 
      this.products;
  
      this.initializeTable(filteredProducts);
    }
  

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
