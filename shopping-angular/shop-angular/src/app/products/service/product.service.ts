import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Product[]>{
    return this.httpClient.get<Product[]>('http://localhost:8080/product');
  }

  saveProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>('http://localhost:8080/product', product);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get('http://localhost:8080/product/' + id).pipe(
      map((data: any) => {
        // Transforme os dados para o tipo 'Client'
        return {
          id: data.id || null,
          name: data.name || '',
          prize: data.prize,
          manufacturer: data.manufacturer,
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        } as Product;
      })
    );
  }
}
