import { Product } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public login = new BehaviorSubject<any>([]);
  private baseURL = "http://localhost:8084/products";
  private adminURL= "http://localhost:8084/AdminProducts";
  constructor(private httpClient: HttpClient) { }
  
  getLogin(){
    return this.login.asObservable();
  }

  getProductList():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/cust`);
  }

  public getProductById(id : number) : Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  public getProductSearch(keyword:string):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/search/${keyword}`);
  }

  getChinese():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/chinese`);
  }

  getIndian():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/indian`);
  }

  getMexican():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/mexican`);
  }

  getItalian():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/italian`);
  }

  getFullProductList():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/Admin`);
  }

  addProduct(product:Product):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,product);
  }

  updateProduct(id:number,product:Product):Observable<Object>{
    return this.httpClient.put<Product>(`${this.baseURL}/${id}`,product);
  }

  deleteProduct(id:number):Observable<Product>{
    return this.httpClient.delete<Product>(`${this.baseURL}/${id}`);
  }
}
