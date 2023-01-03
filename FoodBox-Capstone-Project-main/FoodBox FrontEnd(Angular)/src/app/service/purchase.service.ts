import { Purchase } from 'src/app/model/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseURL="http://localhost:8084/purchase";

  constructor( private httpClient:HttpClient) { }

  getCustomerOrders(email:string):Observable<Purchase[]>{
    return this.httpClient.get<Purchase[]>(`${this.baseURL}/byEmail/${email}`);
  }

  getAllPurchase():Observable<Purchase[]>{
    return this.httpClient.get<Purchase[]>(`${this.baseURL}`);
  }

  deletePurchase(id:any):Observable<Purchase>{
    return this.httpClient.delete<Purchase>(`${this.baseURL}/${id}`);
  }

  searchPurchase(keyword:string):Observable<Purchase[]>{
    return this.httpClient.get<Purchase[]>(`${this.baseURL}/search/${keyword}`);
  }

  buyProducts(buyProdMap:any):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,buyProdMap);
  }
}
