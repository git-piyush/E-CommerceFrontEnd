import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products'  //default 20 items will visible

  private categoryUrl = 'http://localhost:8080/api/product-category'

 // private baseUrl = 'http://localhost:8080/api/products?size=100'; 

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number) : Observable<GetReponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetReponseProducts>(searchUrl);
  }
  
  getProductList(theCategoryId: number) : Observable<Product[]>{
    //@TODO: need to build URL based on category is ... will come back to this
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetReponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetReponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword: string) : Observable<GetReponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                       + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetReponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetReponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}
interface GetReponseProducts{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }


}
interface GetReponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
