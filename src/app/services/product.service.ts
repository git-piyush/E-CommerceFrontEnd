import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products;'  //default 20 items will visible

 // private baseUrl = 'http://localhost:8080/api/products?size=100'; 

  constructor(private httpClient: HttpClient) { }


  getProductList() : Observable<Product[]>{
    return this.httpClient.get<GetReponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetReponse{
  _embedded: {
    products: Product[];
  }
}